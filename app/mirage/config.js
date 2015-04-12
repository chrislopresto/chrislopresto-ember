/* global Ember */
function mirageKey(type, isHasMany) {
  var idSuffix = isHasMany ? '_ids' : '_id';
  return type.underscore().singularize() + idSuffix;
}

function buildLinks(parent, relationshipMap) {
  var links = {};
  var relationships = iterableRelationships(relationshipMap);
  relationships.forEach(function(relationship) {
    var relationshipName = typeof relationship === 'string' ? relationship : Object.keys(relationship)[0];
    var isPlural = relationshipName.pluralize() === relationshipName;
    var relationshipKey = mirageKey(relationshipName, isPlural);
    var relationshipIds = Ember.makeArray(parent[relationshipKey]);
    var linkage = relationshipIds.map(function(id) {
      return { type: relationshipName.pluralize(), id: id };
    });
    if (!isPlural) {
      linkage = linkage[0];
    }

    links[relationshipName] = {
      linkage: linkage
    };
  });

  return links;
}

function isRelationshipKey(key) {
  if (key === 'monegraph_id') { return false; }
  if (/_ids?$/.test(key)) { return true; }
  return false;
}

function mirageItemToJsonApi(resourceType, resource, relationships) {
  var item = {
    type: resourceType,
    id: resource.id,
  };

  if (relationships){
    item.links = buildLinks(resource, relationships);
  }

  Object.keys(resource).forEach(function(key) {
    if (key === 'id') { return; }
    if (isRelationshipKey(key)) { return; }
    var dasherizedKey = key.dasherize();
    item[dasherizedKey] = resource[key];
  });

  return item;
}

function buildData(db, resourceType, resources, relationshipMap) {
  return resources.map(function(resource) {
    return mirageItemToJsonApi(resourceType, resource, iterableRelationships(relationshipMap));
  });
}

function iterableRelationships(relationshipMapNode) {
  if (Ember.typeOf(relationshipMapNode) === 'array') {
    return relationshipMapNode;
  }
  return Object.keys(relationshipMapNode);
}

function getChildRelationships(relationshipMapNode, relationship) {
  var child;
  var relationshipName = Ember.typeOf(relationship) === 'string' ? relationship : Object.keys(relationship)[0];
  if (Ember.typeOf(relationship) === 'object') {
    child = relationship[relationshipName];
  } else {
    child = relationshipMapNode[relationshipName];
  }
  if (!child) { return []; }
  if (Ember.typeOf(child) === 'array') { return child; }
  return Object.keys(child);
}

function getChildRelationshipMap(relationshipMapNode, relationship) {
  var relationshipName = Ember.typeOf(relationship) === 'string' ? relationship : Object.keys(relationship)[0];
  if (Ember.typeOf(relationship) === 'object') {
    return relationship[relationshipName];
  } else {
    return relationshipMapNode[relationshipName];
  }
}

// Builds a map where property names are types and values are maps of id to json node
// Note that this gets us deduping "for free"
function buildInclusionMap(inclusionMap, db, resourceType, resources, relationshipMap) {
  var relationships = iterableRelationships(relationshipMap);
  relationships.forEach(function(relationship){
    var relationshipName = Ember.typeOf(relationship) === 'string' ? relationship : Object.keys(relationship)[0];
    resources.forEach(function(resource){
      var isPlural = relationshipName.pluralize() === relationshipName;
      var relationshipKey = mirageKey(relationshipName, isPlural);
      var relationshipIds = Ember.makeArray(resource[relationshipKey]);

      var relatedItemType = relationshipName.pluralize();
      var table = db[relatedItemType] || [];
      var relatedItems = table.filter(function(candidate) {
        return relationshipIds.contains(candidate.id);
      });

      var childRelationships = getChildRelationships(relationshipMap, relationship);
      relatedItems.forEach(function(resource) {
        var item = mirageItemToJsonApi(relatedItemType, resource, childRelationships);
        if (!inclusionMap[item.type]) { inclusionMap[item.type] = {}; }
        inclusionMap[item.type][item.id] = item;
      });
      var childRelationshipMap = getChildRelationshipMap(relationshipMap, relationship);
      if (childRelationshipMap) {
        buildInclusionMap(inclusionMap, db, relationshipName.pluralize(), relatedItems, childRelationshipMap);
      }
    });
  });
}

// Builds a map using buildInclusionMap and then flatten it into an array of json
// nodes suitable for use as the `included` node of a JSON API response
function buildIncluded(db, resourceType, resources, relationshipMap) {
  var inclusionMap = {};
  buildInclusionMap(inclusionMap, db, resourceType, resources, relationshipMap);
  var included = [];
  Ember.keys(inclusionMap).forEach(function(type) {
    included = included.concat(Ember.keys(inclusionMap[type]).map(function(id){
      return inclusionMap[type][id];
    }));
  });
  return included;
}

function getJsonApiCollection(db, resourceType, relationshipMap) {
  var payload = {
    data: []
  };

  if (!db[resourceType] || db[resourceType].length === 0) {
    return payload;
  }

  var resources = db[resourceType];
  payload.data = buildData(db, resourceType, resources, relationshipMap);
  payload.included = buildIncluded(db, resourceType, resources, relationshipMap);
  console.log('payload:', payload);

  return payload;
}

function getJsonApiInstance(db, resourceType, resourceId, relationshipMap) { // jshint ignore:line
  var payload = {
    data: null
  };

  if (!db[resourceType]) {
    return undefined;
  }

  var resource = db[resourceType].find(resourceId);
  if (!resource) {
    return undefined;
  }

  payload.data = buildData(db, resourceType, [resource], relationshipMap)[0];
  payload.included = buildIncluded(db, resourceType, [resource], relationshipMap);

  console.log('payload:', payload);
  return payload;
}

export default function() {
  this.get('/articles', function(db /*, request */) {
    return getJsonApiCollection(db, 'articles', {});
  });
}

import DS from 'ember-data';
import Ember from 'ember';

var copy = Ember.copy;
var forEach = Ember.ArrayPolyfills.forEach;
var map = Ember.ArrayPolyfills.map;
var filter = Ember.ArrayPolyfills.filter;
var camelize = Ember.String.camelize;
var dasherize = Ember.String.dasherize;
var singularize = Ember.String.singularize;

var ApplicationSerializer = DS.Serializer.extend({

  keyForAttribute: function(key) {
    return dasherize(key);
  },

  keyForRelationship: function(key, kind) { //jshint ignore:line
    return dasherize(key);
  },

  normalizeTypeKey: function(typeKey) {
    return dasherize(singularize(typeKey));
  },

  serializeTypeKey: function(typeKey) {
    return dasherize(typeKey);
  },

  // contract: push payload.included, normalize and return payload.data
  extract: function(store, type, payload, id, requestType) { //jshint ignore:line
    if (!payload.data) { return; }

    var dataType = Ember.typeOf(payload.data);
    var normalizedData;
    if (dataType === 'object') {
      normalizedData = this.extractSingle(store, payload, id);
    } else if (dataType === 'array') {
      store.setMetadataFor(type, payload.meta || {});
      normalizedData = this.extractArray(store, payload);
    }
    var normalizedIncluded = this.extractIncluded(store, payload.included);
    forEach.call(normalizedIncluded, function(entry) {
      store.push(entry.type, entry);
    });
    return normalizedData;
  },

  extractSingle: function(store, payload, id) { //jshint ignore:line
    return this.extractData(store, payload.data);
  },

  extractArray: function(store, payload) {
    return map.call(payload.data, function(item) {
      return this.extractData(store, item);
    }, this);
  },

  extractData: function(store, data) {
    var type, typeName, typeSerializer;

    if (!data) { return; }

    typeName = this.normalizeTypeKey(data.type);

    Ember.assert('No model was found for model name "' + typeName + '"', store.modelFactoryFor(typeName));

    type = store.modelFor(typeName);
    typeSerializer = store.serializerFor(type);

    return typeSerializer.normalize(type, data);
  },

  extractIncluded: function(store, included) {
    var type, typeName, typeSerializer;

    if (!included) { return []; }

    var results = map.call(included, function(data) {
      typeName = this.normalizeTypeKey(data.type);

      if (!store.modelFactoryFor(typeName)) {
        Ember.warn('No model was found for model name "' + typeName + '"', false);
        return;
      }

      type = store.modelFor(typeName);
      typeSerializer = store.serializerFor(type);

      return typeSerializer.normalize(type, data);
    }, this);
    return filter.call(results, function(entry){
      return entry;
    });
  },

  normalizePayload: function(payload) {
    return payload;
  },

  typeForRoot: function(key) {
    return camelize(singularize(key));
  },

  // contract: normalize and push all
  pushPayload: function(store, rawPayload) {

    var dataType = Ember.typeOf(rawPayload.data);
    var type;
    if (dataType === 'object') {
      type = this.normalizeTypeKey(rawPayload.data.type);
    } else if (dataType === 'array' && rawPayload.data.length > 0) {
      type = this.normalizeTypeKey(rawPayload.data[0].type);
    }

    var normalizedData = this.extract(store, type, rawPayload);
    forEach.call(Ember.makeArray(normalizedData), function(entry) {
      store.push(entry.type, entry);
    });
  },

  serialize: function(snapshot, options) {
    var json = {};

    json['type'] = this.serializeTypeKey(snapshot.typeKey);

    if (options && options.includeId) {
      json['id'] = snapshot.id;
    }

    snapshot.eachAttribute(function(key, attribute) {
      this.serializeAttribute(snapshot, json, key, attribute);
    }, this);

    snapshot.eachRelationship(function(key, relationship) {
      if (relationship.kind === 'belongsTo') {
        this.serializeBelongsTo(snapshot, json, relationship);
      } else if (relationship.kind === 'hasMany') {
        this.serializeHasMany(snapshot, json, relationship);
      }
    }, this);

    json = { data: json };

    return json;
  },

  serializeAttribute: function(snapshot, json, key, attribute) {
    var value = snapshot.attr(key);
    var type = attribute.type;

    if (type) {
      var transform = this.transformFor(type);
      value = transform.serialize(value);
    }

    var payloadKey = this.keyForAttribute(key);
    json[payloadKey] = value;
  },

  serializeBelongsTo: function(snapshot, json, relationship) {
    var key = relationship.key;
    var belongsTo = snapshot.belongsTo(key);

    var links = json['links'] = json['links'] || {};

    var payloadKey = this.keyForRelationship(key, 'belongsTo');

    if (Ember.isNone(belongsTo)) {
      links[payloadKey] = { id: null };
    } else {
      links[payloadKey] = {
        type: this.serializeTypeKey(belongsTo.typeKey),
        id: belongsTo.id
      };
    }
  },

  serializeHasMany: function(snapshot, json, relationship) {
    var key = relationship.key;
    var hasMany = snapshot.hasMany(key);

    var links = json['links'] = json['links'] || {};

    var payloadKey = this.keyForRelationship(key, 'hasMany');

    if (hasMany.length === 0) {
      links[payloadKey] = { ids: [] };
    } else {

      // TODO: if all items in hasMany is of the same type, provide
      // { type: "type", ids: [..] } instead of { data: [...] }

      var data = [];
      for (var i = 0; i < hasMany.length; i++) {
        data.push({
          type: this.serializeTypeKey(hasMany[i].typeKey),
          id: hasMany[i].id
        });
      }
      links[payloadKey] = { data: data };
    }
  },



  normalize: function(type, data) {
    var hash = copy(data);

    this.normalizeType(type, hash);
    this.normalizeAttributes(type, hash);
    this.normalizeRelationships(type, hash);
    this.normalizeLinks(hash);
    this.applyTransforms(type, hash);

    return hash;
  },

  normalizeType: function(type, hash) {
    hash['type'] = this.normalizeTypeKey(hash['type']);
  },

  normalizeAttributes: function(type, hash) {
    var payloadKey;

    type.eachAttribute(function(key) {
      payloadKey = this.keyForAttribute(key);

      if (key === payloadKey) { return; }
      if (!hash.hasOwnProperty(payloadKey)) { return; }

      hash[key] = hash[payloadKey];
      delete hash[payloadKey];
    }, this);
  },

  normalizeRelationships: function(type, hash) {
    var payloadKey, link;

    if (!hash.links) { return; }

    type.eachRelationship(function(key, relationship) {
      payloadKey = this.keyForRelationship(key, relationship.kind);

      if (hash.links[payloadKey]) {
        link = hash.links[payloadKey];

        if (relationship.kind === 'belongsTo' && link.linkage && link.linkage.id) {
          // hash[key] = { id: link.linkage[0].id, type: this.normalizeTypeKey(link.linkage[0].type) };
          hash[key] = link.linkage.id;
          delete hash.links[payloadKey];

        } else if (relationship.kind === 'hasMany') {

          if (link.linkage) {

            hash[key] = map.call(link.linkage, function(linkage) {
              return linkage.id;
              // return { id: linkage.id, type: this.normalizeTypeKey(linkage.type) };
            }, this);
            delete hash.links[payloadKey];

          }
        }
      }
    }, this);
  },

  normalizeLinks: function(hash) {
    var links = hash.links;

    if (!links) { return; }

    for (var key in links) {
      links[key] = this.normalizeLink(links[key]);
    }
  },

  normalizeLink: function(link) {
    var normalizedLink = {};

    if (Ember.typeOf(link) === 'string') {
      normalizedLink = {
        self: null,
        resource: link
      };
    } else {
      normalizedLink = {
        self: link.self || null,
        resource: link.resource || null
      };
    }

    return normalizedLink;
  },

  applyTransforms: function(type, hash) {
    type.eachTransformedAttribute(function applyTransform(key, type) {
      if (!hash.hasOwnProperty(key)) { return; }

      var transform = this.transformFor(type);
      hash[key] = transform.deserialize(hash[key]);
    }, this);
  },

  /**
   @method transformFor
   @private
   @param {String} attributeType
   @param {Boolean} skipAssertion
   @return {DS.Transform} transform
  */
  transformFor: function(attributeType, skipAssertion) {
    var transform = this.container.lookup('transform:' + attributeType);
    Ember.assert("Unable to find transform for '" + attributeType + "'", skipAssertion || !!transform);
    return transform;
  }
});

Ember.runInDebug(function() {
  ApplicationSerializer.reopen({
    warnMessageNoModelForKey: function(prop, typeKey) {
      return 'Encountered "' + prop + '" in payload, but no model was found for model name "' + typeKey + '" (resolved model name using ' + this.constructor.toString() + '.typeForRoot("' + prop + '"))';
    }
  });
});

export default ApplicationSerializer;

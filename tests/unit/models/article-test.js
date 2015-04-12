import {
  moduleForModel,
  test
} from 'ember-qunit';

var article;

moduleForModel('article', {
  // Specify the other units that are required for this test.
  needs: [],
  beforeEach: function() {
    article = this.subject({
      body: `The beginning
## ---

More of the body

Even more of the body`
    });
  }
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});

test('it generates a summary', function(assert) {
  assert.equal(article.get('summary'), 'The beginning');
});

test('it generates the display body', function(assert) {
  assert.equal(article.get('displayBody'), `The beginning

More of the body

Even more of the body`
  );
});

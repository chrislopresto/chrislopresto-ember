import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'chrislopresto/tests/helpers/start-app';

var application;

module('Acceptance: Articles', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /blog', function(assert) {
  server.create('article');

  visit('/blog');

  andThen(function() {
    assert.equal(currentPath(), 'site.blog.index');
  });

  andThen(function () {
    var article = server.db.articles[0];
    assert.equal(article.title, 'A Titular Title', 'article title');
  });
});

import Ember from 'ember';
import Site from './site';
import Articles from '../article-markdown';

export default Site.extend({
  activate: function() {
    if (this.store.all('article').content.length === 0) {
      Ember.$.each(Articles, (_, markdown) => {
        var article = this.articleParser.parse(markdown);
        this.store.createRecord('article', article);
      });
    }
  },
  model: function() {
    return this.store.all('article');
  }
});

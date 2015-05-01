import Site from './site';

export default Site.extend({
  activate: function() {
    this.articleParser.createArticles();
  },
  model: function() {
    return this.store.all('article');
  }
});

import Site from '../site';

export default Site.extend({
  beforeModel: function() {
    this.articleParser.createArticles();
  },
  model: function(params) {
    return this.store.all('article', { slug: params.slug }).get('firstObject');
  }
});

import Site from './site';

export default Site.extend({
  model: function() {
    return this.store.findAll('article');
  }
});

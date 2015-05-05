import Ember from 'ember';
import moment from 'moment';

const computed = Ember.computed;

export default Ember.Component.extend({
  articles: null, // injected
  publicArticles: computed.filterBy('articles', 'status', 'public'),
  pastArticles: computed.filter('articles', function(article) {
    return moment(article.get('publishedAt')).isBefore(moment());
  }),
  displayableArticles: computed.intersect('publicArticles', 'pastArticles'),
  sortedArticles: computed.sort('displayableArticles', function(article1, article2) {
    return moment(article1).isBefore(moment(article2));
  }),
  displayedArticles: computed.filterBy('sortedArticles', 'status', 'public'),
  showDetails: true
});

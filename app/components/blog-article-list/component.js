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
    const date1 = moment(article1.get('publishedAt'));
    const date2 = moment(article2.get('publishedAt'));
    if (date1.isBefore(date2)) {
      return 1;
    } else if (date2.isBefore(date1)) {
      return -1;
    }

    return 0;
  }),
  displayedArticles: computed.filterBy('sortedArticles', 'status', 'public'),
  showDetails: true
});

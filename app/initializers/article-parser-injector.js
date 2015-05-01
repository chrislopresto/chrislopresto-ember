export function initialize(container, application) {
  application.inject('route:blog', 'articleParser', 'service:article-parser');
  application.inject('route:blog/article', 'articleParser', 'service:article-parser');
  application.inject('service:article-parser', 'store', 'service:store');
}

export default {
  name: 'article-parser-injector',
  initialize: initialize
};

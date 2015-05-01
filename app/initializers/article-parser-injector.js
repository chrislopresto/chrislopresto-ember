export function initialize(container, application) {
  application.inject('route:blog', 'articleParser', 'service:article-parser');
}

export default {
  name: 'article-parser-injector',
  initialize: initialize
};

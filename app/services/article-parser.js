import Ember from 'ember';
import Articles from '../article-markdown';

var ARTICLE_METADATA_DELIMITER = '## ---';

export default Ember.Service.extend({
  createArticles() {
    if (this.store.all('article').content.length === 0) {
      Ember.$.each(Articles, (_, markdown) => {
        var article = this.parse(markdown);
        this.store.createRecord('article', article);
      });
    }
  },
  getProperty(property, frontmatter) {
    var item = frontmatter.split('\n').filter(function(i) {
      return i.match(new RegExp('^' + property));
    })[0];
    if (!item) {
      return;
    }
    return item.replace(new RegExp('^' + property + ': *'), '');
  },

  parse(markdown) {
    var sections = markdown.split(ARTICLE_METADATA_DELIMITER);
    var frontmatter = sections[1];
    var summary = sections[2];
    var body = sections[2];
    if (sections[3]) {
      body += sections[3];
    }
    body = body.replace(`${ARTICLE_METADATA_DELIMITER}\n`, '');
    return {
      title: this.getProperty('title', frontmatter),
      slug: this.getProperty('slug', frontmatter),
      publishedAt: Date.parse(this.getProperty('publishedAt', frontmatter)),
      summary: summary,
      body: body
    };
  }
});

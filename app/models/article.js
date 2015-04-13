import DS from 'ember-data';

var ARTICLE_METADATA_DELIMITER = '## ---';

var Article = DS.Model.extend({
  title: DS.attr('string'),
  slug: DS.attr('string'),
  body: DS.attr('string'),
  status: DS.attr('string'),
  publishedAt: DS.attr('date'),
  tags: DS.attr()
});

Article.reopenClass({
  propertyFromFrontmatter: function(property, frontmatter) {
    var item = frontmatter.split('\n').filter(function(i) {
      return i.match(new RegExp('^' + property));
    })[0];
    if (!item) {
      return;
    }
    return item.replace(new RegExp('^' + property + ': *'), '');
  },

  fromMarkdown: function(markdown) {
    var sections = markdown.split(ARTICLE_METADATA_DELIMITER);
    var frontmatter = sections[1];
    var summary = sections[2];
    var body = sections[2];
    if (sections[3]) {
      body += sections[3];
    }
    body = body.replace(`${ARTICLE_METADATA_DELIMITER}\n`, '');
    return {
      title: this.propertyFromFrontmatter('title', frontmatter),
      publishedAt: Date.parse(this.propertyFromFrontmatter('publishedAt', frontmatter)),
      summary: summary,
      body: body
    };
  }

});

export default Article;

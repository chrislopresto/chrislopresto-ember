import {
  moduleFor,
  test
} from 'ember-qunit';
import moment from 'moment';

var article;

moduleFor('service:article-parser', {
  beforeEach: function() {
    article = this.subject({
      body: `The beginning
## ---

More of the body

Even more of the body`
    });
  }
});

// Replace this with your real tests.
test('it exists', function(assert) {
  var service = this.subject();
  assert.ok(service);
});

test('it parses an article with frontmatter', function(assert) {
  var service = this.subject();
  var markdown = "## ---\ntitle: A Titular Title\npublishedAt: 2014-04-10\ntags: blogging, ember, hello, world\n## ---\nsecondary fermentation bright beer anaerobic, fermentation. alpha acid aerobic tulip glass, dry hopping **filter** bottom *fermenting* yeast. ~~biere~~ de garde acid rest bittering hops barleywine sparge infusion. lagering! lambic, becher barrel autolysis racking wit filter real ale.\n## ---\n\n## A Section\n\nalpha acid tulip glass dunkle conditioning tank hydrometer hefe. abbey biere de garde aerobic cask conditioning? adjunct aau real ale chocolate malt heat exchanger abbey, keg. lauter aau yeast, specific gravity. barley pitch dextrin, \" bock saccharification,\" goblet. bottom fermenting yeast bunghole: racking. dry hopping, \" black malt lager aroma hops imperial.\" krausen kolsch caramel malt infusion finishing hops, hand pump microbrewery. hard cider, \" saccharification seidel squares pilsner kolsch.\"\n\n```\nvar beerWords = ‘secondary fermentation bright beer anaerobic’;\nconsole.log(beerWords);\n```\n\n## Another Section\n\nspecific gravity length heat exchanger hops reinheitsgebot ale primary fermentation autolysis amber.\" brewpub bock, enzymes dunkle pint glass pub. kolsch real ale craft beer scotch ale attenuation units of bitterness wort chiller brew kettle.\n\n1. with\n1. a\n1. list\n    - with\n    - subitems\n\nYou can try CommonMark here.  This dingus is powered by\n[commonmark.js](https://github.com/jgm/commonmark.js), the\nJavaScript reference implementation.\n";
  var a = service.parse(markdown);
  assert.equal(a.title, 'A Titular Title');
  assert.equal(a.summary.trim(), "secondary fermentation bright beer anaerobic, fermentation. alpha acid aerobic tulip glass, dry hopping **filter** bottom *fermenting* yeast. ~~biere~~ de garde acid rest bittering hops barleywine sparge infusion. lagering! lambic, becher barrel autolysis racking wit filter real ale.\n".trim());
  assert.equal(a.body.trim(), "secondary fermentation bright beer anaerobic, fermentation. alpha acid aerobic tulip glass, dry hopping **filter** bottom *fermenting* yeast. ~~biere~~ de garde acid rest bittering hops barleywine sparge infusion. lagering! lambic, becher barrel autolysis racking wit filter real ale.\n\n\n## A Section\n\nalpha acid tulip glass dunkle conditioning tank hydrometer hefe. abbey biere de garde aerobic cask conditioning? adjunct aau real ale chocolate malt heat exchanger abbey, keg. lauter aau yeast, specific gravity. barley pitch dextrin, \" bock saccharification,\" goblet. bottom fermenting yeast bunghole: racking. dry hopping, \" black malt lager aroma hops imperial.\" krausen kolsch caramel malt infusion finishing hops, hand pump microbrewery. hard cider, \" saccharification seidel squares pilsner kolsch.\"\n\n```\nvar beerWords = ‘secondary fermentation bright beer anaerobic’;\nconsole.log(beerWords);\n```\n\n## Another Section\n\nspecific gravity length heat exchanger hops reinheitsgebot ale primary fermentation autolysis amber.\" brewpub bock, enzymes dunkle pint glass pub. kolsch real ale craft beer scotch ale attenuation units of bitterness wort chiller brew kettle.\n\n1. with\n1. a\n1. list\n    - with\n    - subitems\n\nYou can try CommonMark here.  This dingus is powered by\n[commonmark.js](https://github.com/jgm/commonmark.js), the\nJavaScript reference implementation.\n".trim());
  assert.equal(moment(a.publishedAt).unix(), moment('2014-04-10').unix());
});

test('it parses a property from frontmatter', function(assert) {
  var service = this.subject();
  var frontmatter = "title: A Titular Title\npublishedAt: 2014-04-10\ntags: blogging, ember, hello, world\n";
  var title = service.getProperty('title', frontmatter);
  assert.equal(title, "A Titular Title", 'title');
});

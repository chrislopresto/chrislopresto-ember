import Ember from 'ember';
import _ from 'lodash/lodash';

const { get, set, computed } = Ember;


const FACETS_BY_SLUG = {
  'contractType': {
    slug: 'contractType',
    navText: 'Choose Offer'
  },
  'recipient': {
    slug: 'recipient',
    navText: 'Choose Recipient'
  },
  'exclusivity': {
    slug: 'exclusivity',
    navText: 'Edition Size'
  },
  'classification': {
    slug: 'classification',
    navText: 'Classify Work'
  },
  'price': {
    slug: 'price',
    navText: 'Set Price'
  },
  'remix': {
    slug: 'remix',
    navText: 'Remix Option'
  }
};

export const ALL_ORDERED_FACET_SLUGS = [
  'contractType',
  'recipient',
  'exclusivity',
  'classification',
  'price',
  'remix'
];

const Model = Ember.Object.extend({
  contractType: '',
  classification: '',
  defaultClassification: '',
  remix: true,
  price: 0,
  canAmendTitle: true,
  canTransferTitle: true,
  canTransferRemix: true,
  canSublicense: true,
  isAlreadyRegistered: false,
  expressedSublicense: null,
  previousEditionSize: null,
  isAnEdition: false,
  aggregateMedia: true,
  copy(){
    var copy = Model.create();
    ALL_ORDERED_FACET_SLUGS.forEach((slug)=>{
      set(copy, slug, get(this, slug));
    });
    copy.defaultClassification = this.defaultClassification;
    copy.priceRange = this.priceRange;
    copy.isAlreadyRegistered = this.isAlreadyRegistered;
    copy.canAmendTitle = this.canAmendTitle;
    copy.canTransferTitle = this.canTransferTitle;
    copy.canSublicense = this.canSublicense;
    copy.expressedSublicense = this.expressedSublicense;
    copy.lastValidUsername = this.lastValidUsername;
    copy.previousEditionSize = this.previousEditionSize;
    copy.canTransferRemix = this.canTransferRemix;
    copy.isAnEdition = this.isAnEdition;
    copy.aggregateMedia = this.aggregateMedia;
    copy.isTransferOnly = this.isTransferOnly;
    return copy;
  },
  applyCopy(other){
    ALL_ORDERED_FACET_SLUGS.forEach((slug)=>{
      set(this, slug, get(other, slug));
    });
    set(this, 'lastValidUsername', get(other, 'lastValidUsername'));
  },
  priceRange: {
    min: 1,
    '33%': 25,
    '67%': 50,
    max: 100
  },
  isRecipientAnEmail: computed.match('recipient', /^.+@.+\..+$/),
  isSelling: computed.equal('contractType', 'sell'),
  isTransferring: computed.equal('contractType', 'transfer'),
  isTransferringAnEdition: computed('isTransferring', 'exclusivity', function() {
    return get(this, 'isTransferring') && get(this, 'exclusivity').indexOf('limited edition') > -1;
  }),
  isRegistering: computed('contractType', function() {
    const contractType = get(this, 'contractType');
    return contractType === 'register' || contractType === 'retain ownership of';
  }),
  isRecipientValid: computed('recipient', 'isRecipientAnEmail', 'lastValidUsername', function() {
    const recipient = get(this, 'recipient');
    if (!recipient) { return false; }

    const isRecipientAnEmail = get(this, 'isRecipientAnEmail');
    if (isRecipientAnEmail) { return true; }

    const lastValidUsername = get(this, 'lastValidUsername');
    return recipient === lastValidUsername;
  }),
  availableFacetSlugs: computed('isRegistering', 'isTransferring', 'canAmendTitle', 'canSublicense', 'canTransferRemix', function(){
    let facetSlugs = Ember.A(ALL_ORDERED_FACET_SLUGS);
    let facetsToExclude = [];
    if (get(this, 'isTransferOnly')) {
      facetsToExclude.push('contractType');
    }
    if (!get(this, 'canAmendTitle')) {
      facetsToExclude.push('classification');
    }
    if (!get(this, 'isTransferring')) {
      facetsToExclude.push('recipient');
    }
    if (get(this, 'isRegistering')) {
      facetsToExclude.push('classification', 'exclusivity', 'price', 'remix');
    } else {
      if (get(this, 'isTransferring')) {
        facetsToExclude.push('price');
      }
      if (!get(this, 'canSublicense')) {
        facetsToExclude.push('exclusivity');
      }
      if (!get(this, 'canTransferRemix')) {
        facetsToExclude.push('remix');
      }
    }

    return facetSlugs.reject(facetSlug => {
      return _.contains(facetsToExclude, facetSlug);
    });
  }),
  availableFacets: computed('availableFacetSlugs', function() {
    let availableFacetSlugs = get(this, 'availableFacetSlugs');
    return Ember.A(availableFacetSlugs).map(function(facetSlug){
      return FACETS_BY_SLUG[facetSlug];
    });
  }),
  activeAndPreviousFacetSlugs: computed('currentIndex', 'availableFacetSlugs', function() {
    const currentIndex = get(this, 'currentIndex');
    const availableFacetSlugs = get(this, 'availableFacetSlugs');
    return availableFacetSlugs.slice(0, currentIndex + 1);
  }),
  currentIndex: computed('activeFacet', 'availableFacets', function() {
    const activeFacet = get(this, 'activeFacet');
    const availableFacets = get(this, 'availableFacets');
    return availableFacets.indexOf(activeFacet);
  }),
  activeFacet: null,
  previousFacet: computed('currentIndex', 'availableFacets', function(){
    const currentIndex = get(this, 'currentIndex');
    const availableFacets = get(this, 'availableFacets');
    if (currentIndex <= 0) {
      return null;
    }
    return availableFacets.objectAt(currentIndex - 1);
  }),
  nextFacet: computed('currentIndex', 'availableFacets', function(){
    const currentIndex = get(this, 'currentIndex');
    const availableFacets = get(this, 'availableFacets');
    if (currentIndex >= availableFacets.length - 1) {
      return null;
    }
    return availableFacets.objectAt(currentIndex + 1);
  }),
  isLastFacetActive: computed('availableFacets.[]', 'activeFacet', function(){
    return get(this, 'availableFacets.lastObject') === get(this, 'activeFacet');
  }),
  facetBySlug(slug) {
    return FACETS_BY_SLUG[slug];
  }
});
export default Model;

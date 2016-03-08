import Ember from 'ember';
import { resultComponentForCategory } from '../../../lsgdd/utils/value-converter';
const {
  get,
  computed,
  Component,
  A
  } = Ember;

const defaultAsset = {
  thumbnail: ''
};

const CategoryToCssClassMapping = {
  'Pictures, Drawings and Prints': 'AuctionSearchResult-catPictures',
  'Jewelry': 'AuctionSearchResult-catJewerly',
  'Watches': 'AuctionSearchResult-catWatches',
  'Wine & Spirits': 'AuctionSearchResult-catWines',
  'Furniture and Decorative Arts': 'AuctionSearchResult-catFurniture',
  'Transportation': 'AuctionSearchResult-catTransportation',
  '': ''
};

export default Component.extend({
  checked: false,
  isChecked: Ember.computed('checked', 'selectedItems.[]', {
    get() {
      const selectedItems = get(this, 'selectedItems') || new A();
      const item = get(this, 'document') || {};
      return selectedItems.findBy('_id', item._id);
    },

    set(_, checked) {
      const item = get(this, 'document');
      this.sendAction('selectionChanged', item, checked);
      return checked;
    }
  }),
  classNames: ['AuctionSearchResult'],
  classNameBindings: ['categoryClass'],
  categoryClass: computed(function() {
    const category = get(this, 'document.collectrium_category') || '';
    return CategoryToCssClassMapping[category];
  }),
  asset: computed('document.artwork.assets.length', function() {
    const assets = get(this, 'document.artwork_assets');
    const asset = assets && assets[0];
    return asset || defaultAsset;
  }),
  resultComponentPath: computed('document.collectrium_category', function() {
    const category = get(this, 'document.collectrium_category') || '';
    return `lsgdd/${resultComponentForCategory(category)}`;
  })
});

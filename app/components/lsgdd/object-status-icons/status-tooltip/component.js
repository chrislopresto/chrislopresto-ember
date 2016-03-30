import Ember from 'ember';

const {
  Component,
  computed,
  get
  } = Ember;

export default Component.extend({
  tagName: 'i',
  classNames: ['icon'],
  classNameBindings: ['hoveredClass'],
  hoveredClass: computed('hoverAt', 'data.document{status,is_premium_price}', 'data.priceDiff', function() {
    const hoverAt = get(this, 'hoverAt');
    const saleStatus = get(this, 'data.document.status');
    const premiumPrice = get(this, 'data.document.is_premium_price');
    const priceDiff = get(this, 'data.priceDiff');
    switch (hoverAt) {
      case 'similarObjects':
        return 'icon--similarObjects';
      case 'status':
        if (saleStatus === 'Unsold') {
          return 'icon--unsold';
        } else if (saleStatus === 'Not Yet Available') {
          return 'icon--notAvailable';
        } else if (saleStatus === 'Not Published') {
          return 'icon--notPublished';
        } else if (saleStatus === 'Withdrawn') {
          return 'icon--withdrawn';
        } else if (saleStatus === 'Amended') {
          return 'icon--amended';
        }
        return '';
      case 'price':
        return premiumPrice ? 'icon--premiumPrice' : 'icon--hammerPrice';
      case 'diff':
        return priceDiff > 0 ? 'icon--soldHigher' : 'icon--soldLower';
    }
  })
});

import RevealPresentation from 'ember-reveal-js/controllers/reveal-presentation';

export default RevealPresentation.extend({
  actions: {
    // BEGIN-FREESTYLE-USAGE modal-dialog-controller
    toggleModalDialog() {
      this.toggleProperty('showModalDialog');
    },
    // END-FREESTYLE-USAGE
    // BEGIN-FREESTYLE-USAGE tether-dialog-controller
    toggleTetherDialog() {
      this.toggleProperty('showTetherDialog');
    }
    // END-FREESTYLE-USAGE
  }
});

import RevealPresentation from 'ember-reveal-js/controllers/reveal-presentation';

export default RevealPresentation.extend({
  actions: {
    setTheme: function(theme) {
      this.set('t', theme);
    }
  }
});

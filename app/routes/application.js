import Ember from 'ember';

export default Ember.Route.extend({
  title: function(tokens) {
   const base = 'Chris LoPresto';
   const hasTokens = tokens && tokens.length;

   return hasTokens ? tokens.reverse().join(' | ') + ' | ' + base : base;
  }
});

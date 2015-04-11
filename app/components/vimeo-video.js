import Ember from 'ember';

var computed = Ember.computed;
var get = Ember.get;
var VIMEO_CONTROLS_DEFAULT_COLOR = '00adef';

export default Ember.Component.extend({
  playerId: '66140585', // Default to hilarious Depeche Mode video
  autoPause: false,
  autoPlay: false,
  badge: false,
  byline: false,
  loop: false,
  portrait: true,
  title: true,
  color: VIMEO_CONTROLS_DEFAULT_COLOR,

  playerUrl: computed(
    'playerId',
    'autoPause',
    'autoPlay',
    'badge',
    'byline',
    'loop',
    'portrait',
    'title',
    function() {
      var url =  'https://player.vimeo.com/video/' + get(this, 'playerId') + '?api=0';
      if (get(this, 'autoPlay')) { url += '&autoplay=1'; }
      if (get(this, 'loop')) { url += '&loop=1'; }

      ['autoPause', 'autoPlay', 'badge', 'byline', 'loop', 'portrait', 'title'].forEach((playerParam) => {
        if (get(this, playerParam)) {
          url += '&' + playerParam.toLowerCase() + '=1';
        }
      });
      return url;
    }
  )
});

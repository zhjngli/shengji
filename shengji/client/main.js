import {initUserLanguage, getUserLanguage, getLanguageDirection} from './helpers/lang';
import { getCurrentGame, trackGameState } from './helpers/game-utils';

function hasHistoryApi () {
  return !!(window.history && window.history.pushState);
}

initUserLanguage();

Meteor.setInterval(function () {
  Session.set('time', new Date());
}, 1000);

if (hasHistoryApi()){
  function trackUrlState () {
    var accessCode = null;
    var game = getCurrentGame();
    if (game){
      accessCode = game.accessCode;
    } else {
      accessCode = Session.get('urlAccessCode');
    }
    
    var currentURL = '/';
    if (accessCode){
      currentURL += accessCode+'/';
    }
    window.history.pushState(null, null, currentURL);
  }
  Tracker.autorun(trackUrlState);
}
Tracker.autorun(trackGameState);

FlashMessages.configure({
  autoHide: true,
  autoScroll: false
});

Template.main.helpers({
  whichView: function() {
    return Session.get('currentView');
  },
  language: function() {
    return getUserLanguage();
  },
  textDirection: function() {
    return getLanguageDirection();
  }
});

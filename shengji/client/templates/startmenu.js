import { resetUserState } from '../helpers/player-utils';

Template.startMenu.events({
  'click #btn-new-game': function () {
    Session.set("currentView", "createGame");
  },
  'click #btn-join-game': function () {
    Session.set("currentView", "joinGame");
  }
});

Template.startMenu.helpers({
  alternativeURL: function() {
    return Meteor.settings.public.alternative;
  }
});

Template.startMenu.rendered = function () {
  GAnalytics.pageview("/");

  resetUserState();
};
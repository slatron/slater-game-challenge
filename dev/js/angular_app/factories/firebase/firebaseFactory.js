angular.module('Challenge').
factory('firebaseFactory', function(
  $firebaseObject) {

  var methods = {};
  var ref = firebase.database().ref();
  var challengeObject = $firebaseObject(ref);

  methods.followFirebaseRootObject = function() {
    return challengeObject;
  };

  methods.incrementPlaycount = function(gameId) {
    challengeObject.data[gameId].played = challengeObject.data[gameId].played + 1;
  };

  methods.decrementPlaycount = function(gameId) {
    challengeObject.data[gameId].played = challengeObject.data[gameId].played - 1;
  };

  return methods;
});

angular.module('Challenge').
factory('firebaseFactory', function(
  $timeout,
  $firebaseObject) {

  var methods = {};

  var ref = firebase.database().ref();
  var challengeObject = $firebaseObject(ref);

  methods.followFirebaseRootObject = function() {
    return challengeObject;
  };

  methods.saveData = function() {
    challengeObject.$save();
  };

  methods.incrementPlaycount = function(gameId) {
    if (challengeObject.data[gameId].played < challengeObject.data.times) {
      challengeObject.data[gameId].played = challengeObject.data[gameId].played + 1;
      methods.saveData();
    }
  };

  methods.decrementPlaycount = function(gameId) {
    if (challengeObject.data[gameId].played > 0) {
      challengeObject.data[gameId].played = challengeObject.data[gameId].played - 1;
      methods.saveData();
    }
  };

  return methods;
});

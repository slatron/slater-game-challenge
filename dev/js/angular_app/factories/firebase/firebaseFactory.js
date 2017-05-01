angular.module('Cardgame').
factory('firebaseFactory', function() {
  var db = firebase.database();
  var methods = {};

  methods.setData = function(location, object) {
    if (!location) {
      return false;
    } else if (_.isObject(object)) {
      db.ref(location).set(object);
    } else {
      db.ref(location).set({
        data: object
      });
    }
  };

  methods.readDataOnce = function(location) {
    return db.ref(location).once('value');
  };

  methods.followData = function(location, handler) {
    return db.ref(location).on('value', handler);
  };

  methods.unfollowData = function(location) {
    return db.ref(location).off();
  };

  return methods;
});

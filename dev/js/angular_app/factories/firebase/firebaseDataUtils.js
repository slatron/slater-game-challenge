angular.module('Challenge').
factory('firebaseDataUtilsFactory', function() {
  var db = firebase.database();
  var methods = {};

  // Public Methods
  // ==============================================================================================
  methods.setData = function(location, object) {
    if (!location) {
      return false;
    } else if (_.isObject(object)) {
      db.ref('data/' + location).set(object);
    } else {
      db.ref('data/' + location).set({
        data: object
      });
    }
  };

  methods.readDataOnce = function(location) {
    if (location) {
      return db.ref('data/' + location).once('value');
    } else {
      return db.ref('data').once('value');
    }
  };

  return methods;
});

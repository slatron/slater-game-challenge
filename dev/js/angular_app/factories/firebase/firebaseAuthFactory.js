angular.module('Challenge').
factory('firebaseAuthFactory', function($firebaseAuth) {
  var methods = {};
  var firebaseAuthObject = $firebaseAuth();
  var status = {
    authorized: false
  };

  firebaseAuthObject.$onAuthStateChanged(function(user) {
    if (user) {
      console.log(' ** USER is authorized **');
      status.authorized = true;
    } else {
      console.log(' ** USER Signed out **');
      status.authorized = false;
    }
  });

  // Public Methods
  // ==============================================================================================
  methods.getStatus = function() {
    return status;
  };

  methods.login = function(email, password) {
    return firebaseAuthObject.$signInWithEmailAndPassword(email, password);
  };

  methods.logout = function() {
    return firebaseAuthObject.$signOut();
  };

  return methods;
});

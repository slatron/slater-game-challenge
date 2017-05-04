angular.module('Challenge').
directive('adminPage', function(
  firebaseAuthFactory,
  firebaseFactory,
  pathsData) {
  'use strict';

  return {
    restrict: 'E',
    scope: {},
    controllerAs: 'adminVM',
    bindToController: true,
    replace: true,
    templateUrl: [
      pathsData.directives,
      'admin-page/adminPage.html'
    ].join(''),

    controller: function() {
      var vm = this;

      vm.status       = firebaseAuthFactory.getStatus();
      vm.challenge    = firebaseFactory.followFirebaseRootObject();
      vm.showLogin    = false;
      vm.showRegister = false;
      vm.messages     = [];
      vm.user         = {
        email: '',
        password: ''
      };

      vm.updateTimes      = updateTimes;
      vm.registerUser     = registerUser;
      vm.login            = login;
      vm.logout           = logout;

      function updateTimes() {
        vm.challenge.data.times = parseInt(vm.challenge.data.times);
        firebaseFactory.saveData();
      }

      function login() {
        firebaseAuthFactory.login(vm.user.email, vm.user.password)
          .catch(function(error) {
            vm.messages.push(error);
          })
          .finally(function() {
            vm.showLogin = false;
          });
      }

      function logout() {
        firebaseAuthFactory.logout()
          .catch(function(error) {
            vm.messages.push(error);
          });
      }

      function registerUser() {
        firebaseAuthFactory.registerUser(vm.user.email, vm.user.password)
        .then(function(user) {
          console.log(user);
          vm.messages.push('created new user ', user.email);
        })
        .catch(function(error) {
          vm.messages.push(error);
        })
        .finally(function() {
          vm.showRegister = false;
        });
      }
    },
  };
});

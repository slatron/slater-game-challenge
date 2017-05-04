angular.module('Challenge').
directive('gameGrid', function(
  pathsData,
  firebaseAuthFactory,
  firebaseFactory) {
  'use strict';
  return {
    replace: true,
    scope: {},
    controllerAs: 'gridVM',
    bindToController: true,
    templateUrl: [
      pathsData.directives,
      'game-grid/gameGrid.html'
    ].join(''),
    controller: function($timeout) {
      var vm = this;
      vm.challenge = firebaseFactory.followFirebaseRootObject();
      vm.showLogin = false;
      vm.login     = login;
      vm.logout    = logout;
      vm.messages  = [];
      vm.status    = firebaseAuthFactory.getStatus();
      vm.user      = {
        email: '',
        password: ''
      };

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
    }
  };
});

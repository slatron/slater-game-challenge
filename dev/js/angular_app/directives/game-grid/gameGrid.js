angular.module('Challenge').
directive('gameGrid', function(
  pathsData,
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
    controller: function($scope) {
      var vm = this;
      vm.challenge = firebaseFactory.followFirebaseRootObject();
    }
  };
});

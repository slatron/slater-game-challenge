angular.module('Challenge').
directive('gridRow', function(
  firebaseFactory,
  pathsData) {
  'use strict';
  return {
    replace: true,
    scope: {
      game: '=',
      times: '='
    },
    controllerAs: 'rowVM',
    bindToController: true,
    templateUrl: [
      pathsData.directives,
      'grid-row/gridRow.html'
    ].join(''),
    controller: function($scope) {
      var vm = this;

      vm.decrementPlaycount = firebaseFactory.decrementPlaycount;
      vm.incrementPlaycount = firebaseFactory.incrementPlaycount;

      vm.boxes = [];
      _generateBoxes();

      $scope.$watch(function() {
        return vm.game;
      }, function(newVal) {
        if (newVal) {
          _generateBoxes();
        }
      });

      function _generateBoxes() {
        vm.boxes = [];
        _.times(vm.times, function(idx) {
          vm.boxes.push({played: vm.game.played > idx});
        });
      }
    }
  };
});

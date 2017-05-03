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

      vm.decrementPlaycount = decrementPlaycount;
      vm.incrementPlaycount = incrementPlaycount;

      vm.boxes = [];
      _generateBoxes();

      $scope.$watch(function() {
        return vm.game;
      }, function(newVal, oldVal) {
        if (newVal && (newVal.played !== oldVal.played)) {
          _generateBoxes();
        }
      });

      function _generateBoxes() {
        vm.boxes = [];
        _.times(vm.times, function(idx) {
          vm.boxes.push({played: vm.game.played > idx});
        });
      }

      function incrementPlaycount() {
        if (vm.game.played < 5) {
          firebaseFactory.incrementPlaycount(vm.game.id);
        }
      }

      function decrementPlaycount() {
        if (vm.game.played > 0) {
          firebaseFactory.decrementPlaycount(vm.game.id);
        }
      }
    }
  };
});

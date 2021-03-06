angular.module('Challenge').
directive('gridRow', function(
  $timeout,
  firebaseAuthFactory,
  firebaseFactory,
  pathsData) {
  'use strict';
  return {
    replace: true,
    scope: {
      game: '=',
      times: '=',
      players: '='
    },
    controllerAs: 'rowVM',
    bindToController: true,
    templateUrl: [
      pathsData.directives,
      'grid-row/gridRow.html'
    ].join(''),
    controller: function($scope) {
      var vm = this;
      vm.status = firebaseAuthFactory.getStatus();

      vm.decrementPlaycount  = firebaseFactory.decrementPlaycount;
      vm.incrementPlaycount  = firebaseFactory.incrementPlaycount;
      vm.enterEditTitleMode  = enterEditTitleMode;
      vm.enterEditPlayerMode = enterEditPlayerMode;
      vm.updateTitle         = updateTitle;
      vm.updatePlayer        = updatePlayer;
      vm.gotoPlayed          = gotoPlayed;

      vm.editTitleMode  = false;
      vm.editPlayerMode = false;
      vm.boxes = [];
      _generateBoxes();

      $scope.$watch(function() {
        return vm.game;
      }, function() {
        _generateBoxes();
      });

      function _generateBoxes() {
        vm.boxes = [];
        _.times(vm.times, function(idx) {
          vm.boxes.push({
            played: vm.game.played > idx,
            last: (idx + 1) === vm.game.played
          });
        });
      }

      function enterEditTitleMode() {
        if (vm.status.authorized) {
          vm.editTitleMode = true;
        }
      }

      function gotoPlayed(times) {
        if (vm.status.authorized) {
          firebaseFactory.setGameTimes(vm.game.id, times);
        }
      }

      function enterEditPlayerMode() {
        if (vm.status.authorized) {
          vm.editPlayerMode = true;
          $timeout(function() {
            vm.editPlayerMode = false;
          }, 5000);
        }
      }

      function updateTitle() {
        firebaseFactory.saveData();
        vm.editTitleMode = false;
      }

      function updatePlayer() {
        if (vm.game.player) {
          firebaseFactory.saveData();
        }
        vm.editPlayerMode = false;
      }
    }
  };
});

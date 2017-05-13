angular.module('Challenge').
directive('dataViewer', function(
  firebaseAuthFactory,
  firebaseFactory,
  pathsData) {
  'use strict';

  return {
    restrict: 'E',
    scope: {},
    controllerAs: 'dataVM',
    bindToController: true,
    replace: true,
    templateUrl: [
      pathsData.directives,
      'data-viewer/dataViewer.html'
    ].join(''),

    controller: function() {
      var vm = this;

      vm.status   = firebaseAuthFactory.getStatus();
      vm.messages = [];

      vm.data = firebaseFactory.readDataOnce();
      // debugger;
    },
  };
});

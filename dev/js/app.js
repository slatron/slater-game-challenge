angular.module('Challenge', [
  'firebase',
  'ngSanitize',
  'ngCookies',
  // 'ngPromiseExtras'
  // ui.select
  // ui.sortable
])
.config(function($compileProvider) {
  var config = {
    apiKey: 'AIzaSyDR9at_rJgkb2JP5aUBO4qWdy19NoOmLrw',
    authDomain: 'slater-game-challenge.firebaseapp.com',
    databaseURL: 'https://slater-game-challenge.firebaseio.com',
    projectId: 'slater-game-challenge',
    storageBucket: 'slater-game-challenge.appspot.com',
    messagingSenderId: '701085873805'
  };
  firebase.initializeApp(config);

  /**
   *  NOTE: preAssignedBindings will be deprecated in a
   *        future angular 1.x release. Will need to
   *        use $ngOnInit in all directives to initialize.
   *
   *        Details: https://code.angularjs.org/1.6.1/docs/guide/migration#commit-bcd0d4
   **/
  $compileProvider.preAssignBindingsEnabled(true);
});

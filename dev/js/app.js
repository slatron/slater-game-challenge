angular.module('Challenge', [
  'firebase',
  'ngSanitize',
  'ngCookies'])
.config(function(
  $compileProvider,
  $httpProvider) {
  /**
   *  NOTE: preAssignedBindings will be deprecated in a
   *        future angular 1.x release. Will need to
   *        use $ngOnInit in all directives to initialize.
   *
   *        Details: https://code.angularjs.org/1.6.1/docs/guide/migration#commit-bcd0d4
   **/
  $compileProvider.preAssignBindingsEnabled(true);
  $httpProvider.useApplyAsync(true);
});

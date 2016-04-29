(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider, MetaTagsProvider) {
    $stateProvider
      .state('root.dev', {
        url: appConfig.stateUrlLangPrefix+'/dev',
        views: {
          '@': {
            templateUrl: 'src/app/dev/dev.tpl.html',
            controller: 'DevCtrl as docs',
            resolve: {
              data: function(DataService) {
                return DataService.get();
              }
            }
          }
        }
      });
  }

  /**
   * @name  devCtrl
   * @description Controller
   */
  function DevCtrl($stateParams, $scope, $log, $location, $rootScope, data) {
      $log.debug('DevCtrl laoded!');
    var project = this;
    project.data = data.data;
    $rootScope.checkLocale($stateParams.lang);

    $scope.currentUrl = location.origin + $location.url();
  }

  angular.module('dev', [])
    .config(config)
    .controller('DevCtrl', DevCtrl);
})();

(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider) {
    $stateProvider
      .state('root.home', {
        url: appConfig.stateUrlLangPrefix,
        views: {
          '@': {
            templateUrl: 'src/app/home/home.tpl.html',
            controller: 'HomeCtrl as docs'
          }
        }
      });
  }

  /**
   * @name  homeCtrl
   * @description Controller
   */
  function HomeCtrl($rootScope, $stateParams) {
    $rootScope.checkLocale($stateParams.lang);
  }

  angular.module('root.home', [])
    .config(config)
    .controller('HomeCtrl', HomeCtrl);
})();

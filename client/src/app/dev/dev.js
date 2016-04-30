(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider) {
    $stateProvider
      .state('root.dev', {
        url: appConfig.stateUrlLangPrefix+'/dev',
        views: {
          '@': {
            templateUrl: 'src/app/dev/dev.tpl.html',
            controller: 'DevCtrl as docs'
          }
        }
      });
  }

  /**
   * @name  devCtrl
   * @description Controller
   */
  function DevCtrl($rootScope, $stateParams) {
    $rootScope.checkLocale($stateParams.lang);
  }

  angular.module('root.dev', [])
    .config(config)
    .controller('DevCtrl', DevCtrl);
})();

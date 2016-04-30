(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider) {
    $stateProvider
      .state('root.jobs', {
        url: appConfig.stateUrlLangPrefix+'/jobs',
        views: {
          '@': {
            templateUrl: 'src/app/jobs/jobs.tpl.html',
            controller: 'JobsCtrl as docs'
          }
        }
      });
  }

  /**
   * @name  jobsCtrl
   * @description Controller
   */
  function JobsCtrl($rootScope, $stateParams) {
    $rootScope.checkLocale($stateParams.lang);
  }

  angular.module('root.jobs', [])
    .config(config)
    .controller('JobsCtrl', JobsCtrl);
})();

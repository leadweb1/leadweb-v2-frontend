(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider) {
    $stateProvider
      .state('root.project', {
        url: appConfig.stateUrlLangPrefix+'/project/:projectSlug',
        views: {
          '@': {
            templateUrl: 'src/app/project/project.tpl.html',
            controller: 'ProjectCtrl as project'
          }
        }
      });
  }

  /**
   * @name  ProjectCtrl
   * @description Controller
   */
  function ProjectCtrl($rootScope, $stateParams) {
    $rootScope.checkLocale($stateParams.lang);
  }

  angular.module('root.project', [])
    .config(config)
    .controller('ProjectCtrl', ProjectCtrl);
})();

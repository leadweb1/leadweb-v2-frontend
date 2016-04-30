(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider) {
    $stateProvider
      .state('root.projects', {
        url: appConfig.stateUrlLangPrefix+'/projects',
        views: {
          '@': {
            templateUrl: 'src/app/projects/projects.tpl.html',
            controller: 'ProjectsCtrl as projects'
          }
        }
      });
  }

  /**
   * @name  ProjectsCtrl
   * @description Controller
   */
  function ProjectsCtrl($rootScope, $stateParams) {
    $rootScope.checkLocale($stateParams.lang);
  }

  angular.module('root.projects', [])
    .config(config)
    .controller('ProjectsCtrl', ProjectsCtrl);
})();

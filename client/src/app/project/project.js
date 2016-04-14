(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider) {
    $stateProvider
      .state('root.project', {
        url: '/project/:projectSlug',
        views: {
          '@': {
            templateUrl: 'src/app/project/project.tpl.html',
            controller: 'ProjectCtrl as project',
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
   * @name  ProjectCtrl
   * @description Controller
   */
  function ProjectCtrl($stateParams, $scope, data) {
    var project = this;
    project.data = data.data;

    $scope.projectSlug = $stateParams.projectSlug;
  }

  angular.module('project', [])
    .config(config)
    .controller('ProjectCtrl', ProjectCtrl);
})();

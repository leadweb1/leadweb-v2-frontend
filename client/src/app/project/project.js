(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider, MetaTagsProvider) {
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
        },
        resolve: {
            data: function() {
                console.log('project data resolved');
                return 'data';
            }
        }
      });
      
      MetaTagsProvider
        .when('/project/:projectSlug', {
          title: 'Leadweb - Project',
          description: 'My project',
          fb_title: 'Leadweb - Project',
          fb_site_name: 'Leadweb Project' ,
          fb_url: 'http://project.lead-web.com' ,
          fb_description: 'My project',
          //fb_type: 'Facebook type',
          //fb_image: 'an_image.jpg',
        });
  }

  /**
   * @name  ProjectCtrl
   * @description Controller
   */
  function ProjectCtrl($stateParams, $scope, $log, $location, $rootScope, data) {
      $log.debug('ProjectCtrl laoded!');
    var project = this;
    project.data = data.data;

    $scope.currentUrl = location.origin + $location.url();
    $scope.projectSlug = $stateParams.projectSlug;
    if($scope.data) {
        $rootScope.updateProjectMetadata($scope, $log, $rootScope);
    }
  }

  angular.module('project', [])
    .config(config)
    .controller('ProjectCtrl', ProjectCtrl);
})();

'use strict';

(function() {

  angular.element(document).ready(function() {
    angular.bootstrap(document, ['app']);
  });

  function config($stateProvider, $urlRouterProvider, $logProvider, $httpProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $logProvider.debugEnabled(true);
    $httpProvider.interceptors.push('httpInterceptor');
    $locationProvider.html5Mode(true).hashPrefix('!');
    $stateProvider
      .state('root', {
        views: {
          'header': {
            templateUrl: 'src/common/header.tpl.html',
            controller: 'HeaderCtrl'
          },
          'footer': {
            templateUrl: 'src/common/footer.tpl.html',
            controller: 'FooterCtrl'
          }
        }
      });
  }
  
  function MainCtrl($log, $scope, $rootScope, $http, $state, $stateParams, $location) {
    $log.debug('MainCtrl laoded!');
    
    $rootScope.updateProjectMetadata = function($scope, $log, $rootScope) {
      $scope.project = $scope.data.projects[$scope.data.projects_by_slug[$scope.projectSlug]];
      $log.debug($scope.project);
      $rootScope.metatags =  {
          title: $scope.project.title,
          description: $scope.project.description,
          fb_title: $scope.project.title,
          fb_site_name: $scope.project.title,
          fb_url: $scope.currentUrl,
          fb_description: $scope.project.description
      };
    };

    $http({
        method: 'JSONP',
        url: appConfig.apiUrl + '/api/leadweb.jsonp?callback=JSON_CALLBACK'
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.data = response.data;
        $scope.appConfig = appConfig;
        $scope.currentUrl = location.origin + $location.url();
        $log.debug('state');
        $log.debug($state);
        if($state.current.name === 'root.project') {
            $scope.projectSlug = $stateParams.projectSlug;
            $rootScope.updateProjectMetadata($scope, $log, $rootScope);
        }
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        $log.debug(response);
        //alert('Error loading data');
    });
  }

  function run($log, $FB, MetaTags) {
    $log.debug('App is running!');
    
    $FB.init(appConfig.facebookAppId);
    
    MetaTags.initialize();
  }

  angular.module('app', [
      'ui.router',
      'djds4rce.angular-socialshare',
      'metatags',
      'home',
      'dev',
      'project',
      'common.header',
      'common.footer',
      'common.services.data',
      'common.directives.version',
      'common.filters.uppercase',
      'common.interceptors.http',
      'templates'
    ])
    .config(config)
    .run(run)
    .controller('MainCtrl', MainCtrl)
    .value('version', '1.1.0');
})();

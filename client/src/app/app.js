'use strict';

(function() {

  angular.element(document).ready(function() {
    angular.bootstrap(document, ['app']);
  });

  function config($stateProvider, $urlRouterProvider, $logProvider, $httpProvider, $locationProvider, tmhDynamicLocaleProvider) {
    $urlRouterProvider.otherwise('/'+appConfig.defaultLocale);
    $logProvider.debugEnabled(true);
    $httpProvider.interceptors.push('httpInterceptor');
    //$locationProvider.html5Mode(true).hashPrefix('!');
    tmhDynamicLocaleProvider.localeLocationPattern('/src/vendor/angular-i18n/angular-locale_{{locale}}.js');

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
  
  function MainCtrl($log, $scope, $rootScope, $http, $state, $stateParams, $location, tmhDynamicLocale) {
    $rootScope.allData = [];
    $rootScope.loadMetadata = [];
    
    tmhDynamicLocale.set(appConfig.defaultLocale);
    
    $rootScope.updateMetadata = function(metadata) {
        $rootScope.metatags =  {
            title: metadata.title,
            description: metadata.description,
            og_title: metadata.og_title,
            og_site_name: metadata.og_site_name,
            og_url: metadata.og_url,
            og_description: metadata.og_description
        };
    };
    
    $rootScope.updatePageMetadata = function() {
        $rootScope.updateMetadata({
          title: $scope.page.metadata.title,
          description: $scope.page.metadata.description,
          og_title: $scope.page.metadata.title,
          og_site_name: $scope.page.metadata.title,
          og_url: appConfig.apiUrl + '/' + $rootScope.lang + '/share/page/' + $scope.page.module.replace('root.',''),
          og_description: $scope.page.metadata.description
        });
    };

    $rootScope.updateProjectMetadata = function() {
      $scope.project = $scope.data.projects[$scope.data.projects_by_slug[$scope.projectSlug]];
      $rootScope.updateMetadata({
          title: $scope.project.title,
          description: $scope.project.description,
          og_title: $scope.project.title,
          og_site_name: $scope.project.title,
          og_url: appConfig.apiUrl + '/' + $rootScope.lang + '/share/project/' + $scope.project.slug,
          og_description: $scope.project.description
      });
    };
    
    $rootScope.checkLocale = function(lang) {
        if($rootScope.lang !== lang) {
            $rootScope.lang = lang;
            if($rootScope.allData[$rootScope.lang]) {
                $rootScope.updateData();
            }
            else {
                $rootScope.loadData($rootScope.lang);
            }
        }
    };
    
    $rootScope.updateData = function() {
        $scope.currentUrl = location.origin + $location.url();
        $scope.data = $rootScope.allData[$rootScope.lang];
        if($state.current.name === 'root.project') {
            $scope.projectSlug = $stateParams.projectSlug;
            $rootScope.updateProjectMetadata();
        }
        else {
            $scope.page = $scope.data.pages[$scope.data.pages_by_module[$state.current.name]];
            $rootScope.updatePageMetadata();
        }
    };
    
    $rootScope.httpSuccess = function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        var lang = response.data.lang;
        $rootScope.allData[lang] = response.data;
        $scope.appConfig = appConfig;
        $rootScope.updateData();
    };
    
    $rootScope.httpError = function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        $log.debug(response);
    };
    
    $rootScope.loadData = function(lang) {
        $http({
            method: 'JSONP',
            url: appConfig.apiUrl + '/api/leadweb.jsonp?callback=JSON_CALLBACK&_locale='+lang
        }).then($rootScope.httpSuccess, $rootScope.httpError);
    };
  }

  function run($log, $FB, MetaTags) {
    $FB.init(appConfig.facebookAppId);
    
    MetaTags.initialize();
  }

  angular.module('app', [
      'ui.router',
      'djds4rce.angular-socialshare',
      'metatags',
      'tmh.dynamicLocale',
      'root.home',
      'root.dev',
      'root.projects',
      'root.project',
      'root.jobs',
      'root.contact',
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

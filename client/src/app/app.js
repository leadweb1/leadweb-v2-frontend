'use strict';

(function() {

  angular.element(document).ready(function() {
    angular.bootstrap(document, ['app']);
  });

  function config($stateProvider, $urlRouterProvider, $logProvider, $httpProvider, $locationProvider, tmhDynamicLocaleProvider) {
    $urlRouterProvider.otherwise('/'+appConfig.defaultLocale);
    $logProvider.debugEnabled(true);
    $httpProvider.interceptors.push('httpInterceptor');
    //$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
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
    $log.debug('MainCtrl laoded!');
    
    $rootScope.allData = [];
    $rootScope.lang = appConfig.defaultLocale;
    
    tmhDynamicLocale.set(appConfig.defaultLocale);
    
    $rootScope.updateProjectMetadata = function($scope, $log, $rootScope) {
      $scope.project = $scope.data.projects[$scope.data.projects_by_slug[$scope.projectSlug]];
      $log.debug($scope.project);
      $rootScope.metatags =  {
          title: $scope.project.title,
          description: $scope.project.description,
          fb_title: $scope.project.title,
          fb_site_name: $scope.project.title,
          fb_url: appConfig.apiUrl + '/share/project/' + $scope.project.slug,
          fb_description: $scope.project.description
      };
    };
    
    $rootScope.checkLocale = function(lang) {
        if($rootScope.lang != lang) {
            $rootScope.lang = lang;
            $scope.data = $rootScope.allData[$rootScope.lang]
        }
    }
    
    var locale;
    for(locale in locales) {
        var lang = locales[locale];
        $http({
            method: 'JSONP',
            url: appConfig.apiUrl + '/api/leadweb.jsonp?callback=JSON_CALLBACK&_locale='+lang
        }).then(function successCallback(response) {
            var lang = response.data.lang;
            // this callback will be called asynchronously
            // when the response is available
            $rootScope.allData[lang] = response.data;
            $scope.appConfig = appConfig;
            $scope.currentUrl = location.origin + $location.url();
            $scope.data = $rootScope.allData[$rootScope.lang]
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
      'tmh.dynamicLocale',
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

(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider, MetaTagsProvider) {
    $stateProvider
      .state('root.home', {
        url: appConfig.stateUrlLangPrefix,
        views: {
          '@': {
            templateUrl: 'src/app/home/home.tpl.html',
            controller: 'HomeCtrl as home',
            resolve: {
              data: function(DataService) {
                return DataService.get();
              }
            }
          }
        }
      });
      
      MetaTagsProvider
        .when(appConfig.stateUrlLangPrefix, {
          title: 'Leadweb - Web &amp; Mobile App Development',
          description: 'Digital agency based in Montreal specializing in custom mobile and web solutions',
          fb_title: 'Leadweb - Web &amp; Mobile App Development',
          fb_site_name: 'Leadweb' ,
          fb_url: 'www.blablabla.blabla' ,
          fb_description: 'Digital agency based in Montreal specializing in custom mobile and web solutions',
          //fb_type: 'Facebook type',
          //fb_image: 'an_image.jpg',
        });
  }

  /**
   * @name  HomeCtrl
   * @description Controller
   */
  function HomeCtrl($rootScope, $scope, $log, $location, $stateParams, data) {
      $log.debug('HomeCtrl laoded!');
    var home = this;
    home.data = data.data;
    $rootScope.checkLocale($stateParams.lang);
    
    $scope.currentUrl = location.origin + $location.url();
  }

  angular.module('home', [])
    .config(config)
    .controller('HomeCtrl', HomeCtrl);
})();

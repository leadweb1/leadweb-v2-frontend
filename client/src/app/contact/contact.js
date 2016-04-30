(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider) {
    $stateProvider
      .state('root.contact', {
        url: appConfig.stateUrlLangPrefix+'/contact',
        views: {
          '@': {
            templateUrl: 'src/app/contact/contact.tpl.html',
            controller: 'ContactCtrl as docs'
          }
        }
      });
  }

  /**
   * @name  contactCtrl
   * @description Controller
   */
  function ContactCtrl($rootScope, $stateParams) {
    $rootScope.checkLocale($stateParams.lang);
  }

  angular.module('root.contact', [])
    .config(config)
    .controller('ContactCtrl', ContactCtrl);
})();

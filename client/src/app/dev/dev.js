(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider) {
    $stateProvider
      .state('root.dev', {
        url: '/dev',
        views: {
          '@': {
            templateUrl: 'src/app/dev/dev.tpl.html',
            controller: 'DevCtrl as docs'
          }
        }
      });
  }

  /**
   * @name  devCtrl
   * @description Controller
   */
  function DevCtrl($log) {
    var docs = this;
    docs.someMethos = function () {
      $log.debug('I\'m a method');
    };
  }

  angular.module('dev', [])
    .config(config)
    .controller('DevCtrl', DevCtrl);
})();

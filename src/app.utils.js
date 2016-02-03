import DSLocalForageAdapter from 'js-data-localforage';
import cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import localforage from 'localforage';

/**
 *
 * @param requireContext - a webpack context
 * @return {*}
 */
function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

/**
 *
 * @param appModule - an instance of an angular module (your app module here)
 */
function bootstrap(appModule) {
  const components = require.context('./components', true, /index.js$/);
  const common = require.context('./common', true, /index.js$/);
  const pages = require.context('./pages', true, /index.js$/);

  requireAll(pages)
    .forEach(pageFactory =>{
      pageFactory.default(appModule);
    });

  requireAll(components)
    .forEach((componentFactory)=>{
      componentFactory.default(appModule);
    });

  requireAll(common)
    .forEach((componentFactory)=>{
      componentFactory.default(appModule);
    });

  window.ionic.Platform.ready(()=> {
    let domElement = document.querySelector('body');
    window.angular.bootstrap(domElement, ['Touriscopie']);
  });
}

/**
 *
 * @param $rootScope
 * @param $log
 * @param $ionicPlatform
 * @param $window
 * @param DS
 * @ngInject
 */
function appRun($rootScope, $log, $ionicPlatform, $window, DS) {
  /*eslint no-unused-vars:0*/
  $rootScope.$on('$stateChangeError', function (evt, toState, toParams, fromState, fromParams, error) {
    $log.error(error);
  });
  $ionicPlatform.ready(function () {
    localforage
      .defineDriver(cordovaSQLiteDriver)
      .then(()=> {
        localforage.setDriver([
          cordovaSQLiteDriver._driver,
          localforage.INDEXEDDB,
          localforage.WEBSQL,
          localforage.LOCALSTORAGE
        ]);
        const lf = new DSLocalForageAdapter();
        DS.registerAdapter('localforage', lf);
      });
    if ($window.cordova && $window.cordova.plugins.Keyboard) {
      $window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      $window.cordova.plugins.Keyboard.disableScroll(true);
    }
    if ($window.StatusBar) {
      //$window.StatusBar.styleDefault();
      $window.StatusBar.overlaysWebView(false);
      $window.StatusBar.backgroundColorByHexString('#387ef5');
    }
  });
}

/**
 *
 * @param $urlRouterProvider
 * @param config
 * @param DSProvider
 * @param DSHttpAdapterProvider
 * @ngInject
 */
function appConfig($urlRouterProvider, config, DSProvider, DSHttpAdapterProvider, $logProvider) {
  //$logProvider.debugEnabled(NODE_ENV === 'development');
  $urlRouterProvider.otherwise(`/cat/${config.defaultCategory}`);
  window.angular.extend(DSProvider.defaults, config.api);
  window.angular.extend(DSHttpAdapterProvider.defaults, config.api);
}

export {
  appConfig,
  appRun,
  bootstrap
};

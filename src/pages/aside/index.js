import './aside.scss';
import template from './aside.html';
import {AppController as controller} from './aside.controller';

export default (appModule)=> {
  appModule.config(asideConfig);
};

  /**
   *
   * @param $stateProvider
   * @ngInject
   */
function asideConfig($stateProvider) {
  $stateProvider
    .state('aside', {
      url: '',
      abstract: true,
      template,
      controller
    });
}

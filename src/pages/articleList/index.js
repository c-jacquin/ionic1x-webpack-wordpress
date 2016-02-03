import './articleList.scss';
import template from './articleList.html';
import {ArticleListController as controller} from './articleList.controller.js';


/*eslint camelcase:0*/
export default (appModule)=> {
  appModule.config(articleListConfig);
};

/**
 *
 * @param $stateProvider
 * @ngInject
 */
function articleListConfig($stateProvider) {
  $stateProvider
    .state('articleList', {
      parent: 'aside',
      url: '/cat/:cat',
      template,
      controller,
      controllerAs: 'vm'
    });
}

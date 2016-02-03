import './article.scss';
import template from './article.html';
import {ArticleController as controller} from './article.controller.js';

export default (appModule)=> {
  appModule.config(articleConfig);
};

/**
 *
 * @param $stateProvider
 * @ngInject
 */
function articleConfig($stateProvider) {
  $stateProvider.state('article', {
    parent: 'aside',
    url: '/:id',
    template,
    controller,
    controllerAs: 'vm'
  });
}

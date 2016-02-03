import template from './articleListItem.html';
import {ArticleListItemController} from './articleListItem.controller.js';

export default (appModule) =>{
  appModule.controller('ArticleListItemController', ArticleListItemController);
  appModule.component('articleListItem', {
    bindings: {
      article: '='
    },
    controller: 'ArticleListItemController as vm',
    template: () => {
      return template;
    }
  });
};

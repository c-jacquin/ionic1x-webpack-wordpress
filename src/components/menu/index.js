import './menu.scss';
import template from './menu.html';
import {MenuController} from './menu.controller.js';

export default (appModule)=>{
  appModule.controller('MenuController', MenuController);
  appModule.component('menu', {
    bindings: {
      items: '='
    },
    controller: 'MenuController as vm',
    /*eslint no-unused-vars:0*/
    template: ($element, $attrs)=>{
      return template;
    }
  });
};

import {Category} from './Category';

/**
 * @module common/model/Post
 * @param appModule
 */
export default (appModule)=> {
  appModule.service('Category', Category);
};

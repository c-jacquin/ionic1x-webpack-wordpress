import {Post} from './Post';

/**
 * @module common/model/Post
 * @param appModule
 */
export default (appModule)=> {
  appModule.service('Post', Post);
};

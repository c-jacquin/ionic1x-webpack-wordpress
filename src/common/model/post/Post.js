/**
 * Angular service that use js-data angular to manage wordpress posts
 */
class Post {
  /**
   *
   * @param {object} DS - js-data service
   * @param {object} $log - angularjs log service
   * @returns {object} - a js-data resource integrated  with angular
   * @ngInject
   */
  constructor(DS, $log) {
    return DS.defineResource({
      name: 'post',
      idAttribute: 'id',
      endpoint: 'posts',
      fallbackAdapters: 'localforage',
      beforeInject: function (resource, data) {
        $log.debug('before inject post', data);
        return data.map(post => {
          if (post._embedded) {
            post.category = post._embedded['https://api.w.org/term'][0][0].slug;
          }
          return data;
        });
      }
    });
  }
}

export {
  Post
};

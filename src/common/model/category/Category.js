/**
 * Angular service that use js-data angular to manage wordpress categories
 */
class Category {
  /**
   *
   * @param {object} DS - js-data service
   * @returns {object} - a js-data resource integrated  with angular
   * @ngInject
   */
  constructor(DS) {
    return DS.defineResource({
      name: 'category',
      idAttribute: 'id',
      endpoint: 'categories',
      fallbackAdapters: 'localforage'
      /*afterFindAll: function (resource, data) {
        return Promise.all(data.map((category)=>{
          return this.create(category, {
            adapter: 'localforage'
          });
        })).then(() =>{
          return data;
        });
      }*/
    });
  }
}

export {
  Category
};

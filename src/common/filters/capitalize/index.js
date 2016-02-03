export default (appModule)=>{
  appModule.filter('capitalize', capitalizeFilter);
};

/**
 *
 * @ngInject
 */
function capitalizeFilter() {
  /*eslint no-unused-vars:0*/
  return (input, scope)=> {
    if (input != null) {
      input = input.toLowerCase();
      return input.substring(0, 1).toUpperCase() + input.substring(1);
    }
  };
}

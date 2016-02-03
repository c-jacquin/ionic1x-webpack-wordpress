class AppController {
  /**
   *
   * @param Category
   * @param $ionicPlatform
   * @param $scope
   * @param $log
   * @ngInject
   */
  constructor(Category, $ionicPlatform, $scope, $log) {
    $ionicPlatform.ready(()=>{
      $log.debug('aside ionic ready');
      Category.bindAll({}, $scope, 'vm.categories');
      Category.findAll();
    });
  }
}

export {
  AppController
};

/* eslint camelcase:0 */
class ArticleListController {
  /**
   *
   * @param $scope
   * @param Post
   * @param config
   * @param $ionicFilterBar
   * @param $ionicPlatform
   * @param $stateParams
   * @param $log
   * @ngInject
   */
  constructor($scope, Post, config, $ionicFilterBar, $ionicPlatform, $stateParams, $log) {
    //ugly shit to make controllerAs work with ionic wtf ???!!??!
    $scope.vm = this;
    this.scope = $scope;
    this.Post = Post;
    this.config = config;
    this.$stateParams = $stateParams;
    this.$log = $log;
    this.page = 1;
    this.$ionicFilterBar = $ionicFilterBar;
    this.elasticHeaderClass = `${$stateParams.cat}-elastic-header`;

    $ionicPlatform.ready(()=>{
      $log.log('ready ctrl list');
      this.isReady = true;
      Post.bindAll({
        where: {
          category: {
            '==': this.$stateParams.cat
          }
        }
      }, $scope, 'vm.posts');
      //this.loadMore();
    });
  }

  /**
   * Load more article work with infinite scroll
   */
  loadMore() {
    this.$log.debug('loadMore');
    if (this.filterBarInstance) {
      this.filterBarInstance();
      this.filterBarInstance = null;
    }

    /*let params = {
      adapter: 'http'
    };*/
    let queryParams = {
      page: this.page,
      per_page: this.config.crud.itemPerPage,
      _embed: true,
      'filter[category_name]': this.$stateParams.cat
    };

    this.Post.findAll(queryParams)
      .then(list => {
        this.$log.debug('post response ', list);
        this.loadComplete = list < this.config.crud.itemPerPage;
        this.page++;
      })
      .catch(err => {
        this.$log.error(err);
      })
      .finally(() => {
        this.scope.$broadcast('scroll.infiniteScrollComplete');
      });

  }

  /**
   * refresh article list work with pull to refresh directive
   */
  pullToRefresh() {
    this.Post.destroyAll({
      category: this.$stateParams.cat
    }, {
      adapter: 'localforage'
    }).then(()=>{
      this.page = 1;
      return this.Post.findAll(
        {
          page: this.page,
          per_page: this.config.crud.itemPerPage,
          _embed: true,
          'filter[category_name]': this.$stateParams.cat
        }
      );
    })
      .finally(()=>{
        this.scope.$broadcast('scroll.refreshComplete');
      });
  }

  /**
   * filter the list work with the directive ion filter bar
   */
  showFilterBar() {
    this.filterBarInstance = this.$ionicFilterBar.show({
      items: this.posts,
      update: (filteredItems)=> {
        this.posts = filteredItems;
      }
    });
  }
}

export {
  ArticleListController
};

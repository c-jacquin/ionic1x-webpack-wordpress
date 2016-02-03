import template from './article.html';

export default (appModule)=>{
  appModule.directive('wparticle', wpArticle);
};

/**
 *
 * @param $window
 * @param $sce
 * @return {{scope: {post: string}, template, link: Function}}
 * @ngInject
 */
function wpArticle($window, $sce) {
  return {
    scope: {
      post: '='
    },
    template,
    link: (scope, element)=>{
      scope.headerClass = `${scope.post.id}-header-class`;
      let content = $window.angular.element(scope.post);
      if (content.find('img')[0]) {
        scope.imgUrl = content.find('img')[0].src;
        content.find('img')[0].remove();
        content.find('img').attr('width', '100%');
      } else if (content.find('iframe')[0]) {
        scope.youtubeUrl = $sce.trustAsResourceUrl(content.find('iframe')[0].src);
        content[0].querySelector('iframe').remove();
      }
      element.find('article').append(content);
    }
  };
}

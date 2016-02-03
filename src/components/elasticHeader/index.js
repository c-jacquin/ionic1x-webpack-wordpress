export default (appModule)=>{
  appModule.directive('elasticHeader', elasticHeaderDirective);
};

/**
 *
 * @param $ionicScrollDelegate
 * @param $window
 * @param $timeout
 * @return {{restrict: string, link: Function}}
 * @ngInject
 */
function elasticHeaderDirective($ionicScrollDelegate, $window, $timeout) {
  return {
    restrict: 'A',
    link: function (scope, scroller, attr) {
      $timeout(()=>{
        let scrollerHandle = $ionicScrollDelegate.$getByHandle(attr.delegateHandle);
        let header = document.querySelector(attr.elasticHeader);
        let headerHeight = header.clientHeight;
        let translateAmt;
        let scaleAmt;
        let scrollTop;
        //let lastScrollTop;
        let ticking = false;

        // Set transform origin to top:
        header.style[$window.ionic.CSS.TRANSFORM + 'Origin'] = 'center bottom';

        // Update header height on resize:
        window.addEventListener('resize', ()=> {
          headerHeight = header.clientHeight;
        }, false);

        scroller[0].addEventListener('scroll', requestTick);

        function requestTick() {
          if (!ticking) {
            $window.ionic.requestAnimationFrame(updateElasticHeader);
          }
          ticking = true;
        }

        function updateElasticHeader() {

          scrollTop = scrollerHandle.getScrollPosition().top;

          if (scrollTop >= 0) {
            // Scrolling up. Header should shrink:
            translateAmt = scrollTop / 2;
            scaleAmt = 1;
          } else {
            // Scrolling down. Header should expand:
            translateAmt = 0;
            scaleAmt = -scrollTop / headerHeight + 1;
          }

          // Update header with new position/size:
          header.style[$window.ionic.CSS.TRANSFORM] = `translate3d(0,${translateAmt}px,0) scale(${scaleAmt},${scaleAmt})`;

          ticking = false;
        }
      });
    }
  };
}

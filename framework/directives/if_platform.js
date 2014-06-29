/**
 * @ngdoc directive
 * @id if-platform
 * @name ons-if-platform
 * @description
 * Conditionally display content depending on the platform/browser. Valid values are [ios/android/blackberry/chrome/safari/firefox/opera]. Different from other components, this component is used as attribute in any element.
 * @param ons-if-platform Either opera, firefox, safari, chrome, ie, android, blackberry, ios or windows.
 */
(function() {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsIfPlatform', function($onsen) {
    return {
      restrict: 'A',
      replace: false,
      transclude: true,
      scope: true,
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/if_platform.tpl',
      link: function($scope, element, attrs) {

        var platform;

        var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
        // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
        var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
        var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
        // At least Safari 3+: "[object HTMLElementConstructor]"
        var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
        var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6

        if(isOpera){
          platform = "opera";
        }

        if(isFirefox){
          platform = "firefox";
        }

        if(isSafari){
          platform = "safari";
        }

        if(isChrome){
          platform = "chrome";
        }

        if(isIE){
          platform = "ie";
        }

        if (navigator.userAgent.match(/Android/i)) {
          platform = "android";
        }

        if ((navigator.userAgent.match(/BlackBerry/i)) || (navigator.userAgent.match(/RIM Tablet OS/i)) || (navigator.userAgent.match(/BB10/i))) {
          platform = "blackberry";
        }

        if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
          platform = "ios";
        }

        if (navigator.userAgent.match(/IEMobile/i)) {
          platform = "windows";
        }

        $scope.platform = platform;


        attrs.$observe('onsIfPlatform', function(userPlatform) {
          if (userPlatform) {
            $scope.userPlatform = userPlatform.toLowerCase();
          }
        });
      }
    };
  });
})();

'use strict';

angular.module('emission.controllers', ['emission.splash.updatecheck'])

.controller('RootCtrl', function($scope) {})

.controller('DashCtrl', function($scope) {})

.controller('SplashCtrl', function($scope, $state, $interval, $rootScope, 
    $ionicPlatform, $ionicPopup, $ionicPopover, $window, UpdateCheck)  {
  console.log('SplashCtrl invoked');
      // alert("attach debugger!");
      // PushNotify.startupInit();
  console.log('SplashCtrl invoke finished');

  $ionicPlatform.ready(function() {
    $scope.scanEnabled = true;
  });

  $ionicPopover.fromTemplateUrl('templates/study-consent.html', {
    backdropClickToClose: true,
    hardwareBackButtonClose: true,
    scope: $rootScope
  }).then(function(popover) {
    $scope.consentPopover = popover;
  });

  $ionicPopover.fromTemplateUrl('templates/about-app.html', {
    backdropClickToClose: true,
    hardwareBackButtonClose: true,
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
    $scope.isIOS = $ionicPlatform.is('ios');
    $scope.isAndroid = $ionicPlatform.is('android');
  });

  $scope.showDetails = function($event) {
    $scope.popover.show($event)
  }

  $scope.hideDetails = function($event) {
    $scope.popover.hide($event)
  }

  $scope.showConsent = function($event) {
    $window.cordova.InAppBrowser.open("https://e-mission.eecs.berkeley.edu/privacy",
        '_system');
    // $scope.consentPopover.show($event)
  }

  $scope.hideConsent = function($event) {
    $scope.consentPopover.hide($event)
  }

  $scope.scanCode = function() {
    if (!$scope.scanEnabled) {
        $ionicPopup.alert({template: "plugins not yet initialized, please retry later"});
    } else {
      cordova.plugins.barcodeScanner.scan(
        function (result) {
            if (result.format == "QR_CODE" && 
                result.cancelled == false && 
                result.text.substring(0,11) == "emission://") {
                handleOpenURL(result.text);
            } else {
                $ionicPopup.alert({template: "invalid study reference "+result.text});
            }
        },
        function (error) {
            $ionicPopup.alert({template: "Scanning failed: " + error});
        });
    }
  }; // scanCode
}) // controller


.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

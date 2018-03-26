'use strict';

angular.module('emission.controllers', ['emission.splash.updatecheck',
                                        'emission.splash.localnotify',
                                        ])

.controller('RootCtrl', function($scope) {})

.controller('DashCtrl', function($scope) {})

.controller('SplashCtrl', function($scope, $state, $interval, $rootScope, 
    $ionicPlatform, $ionicPopup, UpdateCheck, LocalNotify)  {
  console.log('SplashCtrl invoked');
      // alert("attach debugger!");
      // PushNotify.startupInit();
  console.log('SplashCtrl invoke finished');

  $ionicPlatform.ready(function() {
    $scope.scanEnabled = true;
  });

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

// Ionic E-Mission App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'emission' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'emission.services' is found in services.js
// 'emission.controllers' is found in controllers.js
'use strict';

angular.module('emission', ['ionic',
    'emission.controllers', 'emission.plugin.logger',
    'emission.splash.customURLScheme',
    'emission.splash.updatecheck'])

.run(function($ionicPlatform, $rootScope, $http, Logger,
    CustomURLScheme, UpdateCheck) {
  console.log("Starting run");
  // alert("Starting run");
  // BEGIN: Global listeners, no need to wait for the platform
  // TODO: Although the onLaunch call doesn't need to wait for the platform the
  // handlers do. Can we rely on the fact that the event is generated from
  // native code, so will only be launched after the platform is ready?
  CustomURLScheme.onLaunch(function(event, url, urlComponents){
    console.log("GOT URL:"+url);
    // alert("GOT URL:"+url);

    if (urlComponents.route == 'change_client') {
      UpdateCheck.handleClientChangeURL(urlComponents);
    }
  });
  // END: Global listeners
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    Logger.log("ionicPlatform is ready");
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    Logger.log("setting connection to default since this is emTripLog");
    window.cordova.plugins.BEMConnectionSettings.getDefaultSettings().then(function(defaultConfig) {
        Logger.log("defaultConfig = "+JSON.stringify(defaultConfig));
        window.cordova.plugins.BEMConnectionSettings.setSettings(defaultConfig);
    }).catch(function(err) {
        Logger.displayError("Error reading or setting connection defaults", err);
    });
    cordova.plugin.http.setDataSerializer('json');
  });
  console.log("Ending run");
})

.config(function($stateProvider, $urlRouterProvider) {
  console.log("Starting config");

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set a few states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  // set up a state for the splash screen. This has no parents and no children
  // because it is basically just used to load the user's preferred screen.
  // This cannot directly use plugins - has to check for them first.
  .state('splash', {
        url: '/splash',
        templateUrl: 'templates/study-text.html',
        controller: 'SplashCtrl'
  })

  // setup an abstract state for the root. Only children of this can be loaded
  // as preferred screens, and all children of this can assume that the device
  // is ready.
  .state('root', {
    url: '/root',
    abstract: true,
    template: '<ion-nav-view/>',
    controller: 'RootCtrl'
  });

  // alert("about to fall back to otherwise");
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/splash');
  console.log("Ending config");
});

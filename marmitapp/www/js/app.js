(function () {

    'use strict';

    angular.module('marmitapp', [
        'ionic',
        'ngOpenFB',
        'marmitapp.controllers',
        'marmitapp.services'
    ])

        .constant('OPEN_FB_CONFIG', {
            appId: '317057558674733',
            tokenStore: localStorage
        })

        .constant('FIREBASE_CONFIG', {
            appId: 'marmitapp-3edb1',
            apiKey: 'AIzaSyBoF_gAdX3F7mfo_VsuK7_rlS5Fv9CEXlM',
            authDomain: 'marmitapp-3edb1.firebaseapp.com',
            databaseURL: 'https://marmitapp-3edb1.firebaseio.com',
            storageBucket: 'marmitapp-3edb1.appspot.com',
            messagingSenderId: '543028507015'
        })

        .run(function ($ionicPlatform, $openFB, FIREBASE_CONFIG, OPEN_FB_CONFIG) {
            firebase.initializeApp(FIREBASE_CONFIG);

            $openFB.init(OPEN_FB_CONFIG);

            $ionicPlatform.ready(function () {

                if (window.cordova && window.cordova.plugins.Keyboard) {
                    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                    // for form inputs)
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                    // Don't remove this line unless you know what you are doing. It stops the viewport
                    // from snapping when text inputs are focused. Ionic handles this internally for
                    // a much nicer keyboard experience.
                    cordova.plugins.Keyboard.disableScroll(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
            });
        });
})();
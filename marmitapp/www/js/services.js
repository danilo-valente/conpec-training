(function () {

    'use strict';

    angular.module('marmitapp.services', [])

        .factory('dbMarmitas', function () {
            return firebase.database().ref('/marmitas');
        })

        .factory('dbCart', function () {
            return firebase.database().ref('/cart');
        });

})();
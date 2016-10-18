(function () {

    'use strict';

    angular.module('marmitapp.controllers', [])

        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('welcome', {
                    url: '/welcome',
                    templateUrl: 'views/welcome.html',
                    controller: WelcomeCtrl
                })

                .state('app', {
                    url: '/app',
                    abstract: true,
                    templateUrl: 'views/tabs.html',
                    controller: AppCtrl
                })

                .state('app.home', {
                    url: '/home',
                    views: {
                        'tab-home': {
                            templateUrl: 'views/tab-home.html',
                            controller: HomeCtrl
                        }
                    }
                })

                .state('app.cart', {
                    url: '/cart',
                    views: {
                        'tab-cart': {
                            templateUrl: 'views/tab-cart.html',
                            controller: CartCtrl
                        }
                    }
                });

            $urlRouterProvider.otherwise('/welcome');
        });

    function WelcomeCtrl($scope, $state, $openFB) {

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                $state.go('app.home');
            }
        });

        $scope.fbSignIn = function () {

            $openFB.login({ scope: 'email' })
                .then(function (accessToken) {
                    var credentials = firebase.auth.FacebookAuthProvider.credential(accessToken);
                    firebase.auth().signInWithCredential(credentials);
                })
                .catch(function (error) {
                    // error
                });
        };
    }

    function AppCtrl($scope, $state, $timeout, dbCart) {

        firebase.auth().onAuthStateChanged(function (currentUser) {
            if (!currentUser) {
                $state.go('welcome');
                return;
            }

            $scope.cartItemsCount = 0;

            dbCart.child(currentUser.uid).on('value', function (cartSnap) {
                $scope.cartItemsCount = cartSnap.numChildren();

                $timeout(function () {
                    $scope.$digest();
                });
            });
        });
    }

    function HomeCtrl($scope, $timeout, $ionicModal, $ionicPopup, dbMarmitas, dbCart) {
        firebase.auth().onAuthStateChanged(function (currentUser) {

            $scope.marmitas = [];

            $scope.marmita = null;

            $scope.announceModal = null;

            dbMarmitas.orderByChild('announceDate').on('child_added', function (data) {
                var value = data.val();
                value.uid = data.key;

                $scope.marmitas.unshift(value);

                $timeout(function () {
                    $scope.$digest();
                });
            });

            $scope.openAnnounceModal = function () {
                $scope.marmita = { userUid: currentUser.uid };
                $scope.announceModal.show();
            };

            $scope.announce = function () {
                $scope.marmita.announceDate = new Date();
                dbMarmitas.push($scope.marmita);
                $scope.announceModal.hide();
            };

            $scope.addToCart = function (marmita) {
                dbCart.child(currentUser.uid + '/' + marmita.uid).set(true);

                $ionicPopup.alert({
                    title: 'Item adicionado',
                    template: 'O item <strong>' + marmita.name + '</strong> foi adicionado ao seu carrinho',
                    okType: 'button-assertive'
                })
            };

            $scope.logout = function () {
                firebase.auth().signOut();
            };

            $ionicModal.fromTemplateUrl('views/modal-announce.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.announceModal = modal;
            });

            $scope.$on('$destroy', function () {
                $scope.announceModal.remove();
            });
        });
    }

    function CartCtrl($scope, $timeout, dbCart, dbMarmitas) {

        firebase.auth().onAuthStateChanged(function (currentUser) {
            $scope.items = [];

            var userCart = dbCart.child(currentUser.uid);

            userCart.on('child_added', function (data) {
                dbMarmitas.child(data.key).once('value', function (marmitaSnap) {
                    var marmita = marmitaSnap.val();
                    marmita.uid = marmitaSnap.key;

                    $scope.items.push(marmita);

                    $timeout(function () {
                        $scope.$digest();
                    });
                });
            });

            userCart.on('child_removed', function (data) {
                for (var i = 0; i < $scope.items.length; i++) {
                    if ($scope.items[i].uid === data.key) {
                        $scope.items.splice(i, 1);

                        $timeout(function () {
                            $scope.$digest();
                        });

                        break;
                    }
                }
            });

            $scope.removeItem = function (marmitaUid) {
                userCart.child(marmitaUid).remove();
            };
        });
    }

})();

(function(){
    'use strict';

    angular.module('Instagram', ['ngRoute', 'ngMessages', 'satellizer'])
        
        .config(['$routeProvider', '$authProvider', function($routeProvider, $authProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/home.html',
                    controller: 'HomeCtrl'
                })
                .when('/login', {
                    templateUrl: 'views/login.html',
                    controller: 'LoginCtrl'
                })
                .when('/signup', {
                    templateUrl: 'views/signup.html',
                    controller: 'SignupCtrl'
                })
                .when('/photo/:id', {
                    templateUrl: 'views/detail.html',
                    controller: 'DetailCtrl'
                })
                .otherwise('/');

            $authProvider.loginUrl = 'http://localhost:3000/auth/login';
            $authProvider.signupUrl = 'http://localhost:3000/auth/signup';
            $authProvider.oauth2({
              name: 'PhotoGallery',
              url: 'http://localhost:3000/auth/instagram',
              redirectUri: 'http://localhost:8080',
              clientId: 'b595fd95f2bc417abf8beb1f38197734',
              requiredUrlParams: ['scope'],
              scope: ['likes'],
              scopeDelimiter: '+',
              authorizationEndpoint: 'https://api.instagram.com/oauth/authorize'
            });

        }]);
    
})();
(function(){
    'use strict';

    angular.module('Instagram').controller('NavbarCtrl', ['$scope', '$rootScope', '$window', '$auth', NavbarCtrl]);

    function NavbarCtrl($scope, $rootScope, $window, $auth){
        $scope.isAuthenticated = function() {
            return $auth.isAuthenticated();
        };

        $scope.logout = function() {
            $auth.logout();
            delete $window.localStorage.currentUser;
        };
    }
    
})();
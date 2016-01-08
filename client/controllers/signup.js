(function(){
    'use strict';

    angular.module('Instagram').controller('SignupCtrl', ['$scope', '$auth', SignupCtrl]);

    function SignupCtrl($scope, $auth){
        $scope.signup = function() {
            var user = {
                email: $scope.email,
                password: $scope.password
            };

            //Satellizer
            $auth.signup(user)
                .catch(function(response) {
                    console.log(response.data);
                    $scope.errorMessage = {};
                    angular.forEach(response.data.message, function(message, field) {
                        $scope.signupForm[field].$setValidity('server', false);
                        $scope.errorMessage[field] = response.data.message[field];
                    });
                });
        };
    }
    
})();
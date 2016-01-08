angular.module('Instagram').directive('serverError', [function(){
    return {
        require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        link: function($scope, element, attrs, controller) {
            element.on('keydown', function() {
                controller.$setValidity('server', true);
            });
        }
    };
}]);
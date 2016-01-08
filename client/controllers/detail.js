(function(){
    'use strict';

    angular.module('Instagram').controller('DetailCtrl', ['$scope', '$rootScope', '$location', 'API', DetailCtrl]);

    function DetailCtrl($scope, $rootScope, $location, API){
        var mediaId = $location.path().split('/').pop();

        API.getMediaById(mediaId).success(function(data) {
            $scope.hasLiked = media.user_has_liked;
            $scope.photo = media;
        });

        $scope.like = function() {
            $scope.hasLiked = true;
            API.likeMedia(mediaId).error(function(data) {
                sweetAlert('Error', data.message, 'error');
            });
        };
    }
    
})();
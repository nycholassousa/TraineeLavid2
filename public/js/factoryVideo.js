angular.module("videoUpload").factory('videoFactory', function(){
    return{
        insertData: function($scope, $http, Upload){
            Upload.upload({
                url: '/public/videos',
                method: 'post',
                data: $scope.upload
            }).then(function (response) {
                console.log(response.data);
                //$scope.videos.push(response.data);
                $scope.upload = {};
            })
            }
        }
});
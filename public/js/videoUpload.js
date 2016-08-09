angular.module("videoUpload").
controller('videoUploadController', ['$http', 'Upload', '$scope', 'videoFactory',
  '$routeParams', function($http, Upload, $scope, videoFactory, $routeParams){

  $scope.getVideos = function(){
    $http.get('/public/videos').then(function(response){
    console.log(response.data);
    $scope.videos = response.data;
    });
  }

  $scope.insertVideo = function(){
    $scope.formFactory = videoFactory.insertData($scope, $http, Upload);
  };
}]);
angular.module("videoUpload").
controller('videoUploadController', ['$http', 'Upload', '$scope', '$state',
  'videoFactory', '$route', function($http, Upload, $scope, $state,
    videoFactory, $route){

  $scope.insertVideo = function(){
    $scope.formFactory = videoFactory.insertData($scope, $http, Upload);
  };

  $scope.getVideosList = function(){
    $http.get('/public/videos').then(function(response){
    console.log(response.data);
    $scope.videos = response.data;
    });
  };

  $scope.getVideo = function(video) {
    $scope.video = video;
    $scope.url = video.file.path + "/" + video.file.originalname;
  };

  $scope.removeVideo = function(id){
    $http.delete('/public/videos/'+id).success(function(response){
      console.log(response);
      window.location.href='#/videolist';
      return $route.reload();
    });
  };

  $scope.updateVideo = function(video) {
      $http.put('/public/videos/' + video._id, video).success( function(response){
      window.location.href='#/videolist';
      return $route.reload();
      });
  };
}]);
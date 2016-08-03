var app = angular.module('videoUpload', ['ngFileUpload']);


app.controller('videoUploadController', ['$http', 'Upload', '$scope', function($http, Upload, $scope){

  $http.get('/public/videos').then(function(response){
    console.log(response.data);
    $scope.videos = response.data;
  });

  $scope.submit = function(){
    Upload.upload({
      url: '/public/videos',
      method: 'post',
      data: $scope.upload
    }).then(function (response) {
      console.log(response.data);
      $scope.videos.push(response.data);
      $scope.upload = {};
    })
  }
}]);
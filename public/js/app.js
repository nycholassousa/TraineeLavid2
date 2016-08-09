angular.module('videoUpload', ['ngFileUpload', 'ngRoute']);

angular.module("videoUpload").config(function ($routeProvider) {
	$routeProvider.when("/videolist", {
        templateUrl: "/views/videolist.html",
    });
	$routeProvider.when("/videoinsert", {
		templateUrl: "/views/videoinsert.html",
		controller: "videoUploadController",
	});
});
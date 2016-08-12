angular.module('videoUpload', ['ngFileUpload', 'ngRoute', 'ui.router']);

angular.module("videoUpload").config(function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "/views/videolist.html",
    });
	$routeProvider.when("/videolist", {
        templateUrl: "/views/videolist.html",
    });
    $routeProvider.when("/detail", {
        templateUrl: "/views/videodetail.html",
    });
    $routeProvider.when("/edit", {
        templateUrl: "/views/editvideo.html",
        controller: "videoUploadController",
    });
	$routeProvider.when("/videoinsert", {
		templateUrl: "/views/videoinsert.html",
		controller: "videoUploadController",
	});
});
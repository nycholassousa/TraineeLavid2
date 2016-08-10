angular.module('videoUpload', ['ngFileUpload', 'ngRoute', 'ui.router']);

angular.module("videoUpload").config(function ($routeProvider) {
	$routeProvider.when("/videolist", {
        templateUrl: "/views/videolist.html",
    });
    $routeProvider.when("/detail", {
        templateUrl: "/views/videodetail.html",
    });
	$routeProvider.when("/videoinsert", {
		templateUrl: "/views/videoinsert.html",
		controller: "videoUploadController",
	});
});
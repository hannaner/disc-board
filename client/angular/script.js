var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider, $locationProvider){

	$routeProvider
		.when('/', {
			templateUrl: 'static/partials/login.html',
			controller: "usersController"
		})
		.when('/dashboard/:current_user', {
			templateUrl: 'static/partials/dashboard.html',
			controller: "dashboardController"
		})
		.when('/profile/:user_id', {
			templateUrl: 'static/partials/profile.html',
			controller: "profileController"
		})
		.when('/topic/:topic_id', {
			templateUrl: 'static/partials/topic.html',
			controller: "topicsController"
		})
		.otherwise({
			redirectTo: '/'
		});

});
'use strict';

angular
	.module('actTitleSkillsApp', [
		'ngCookies',
		'ngResource',
		'ngSanitize',
		'ngRoute',
		'angucomplete'
	])
	.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	});

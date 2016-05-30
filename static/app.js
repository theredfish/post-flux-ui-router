'use strict';

require('angular');
global.jQuery = require('jquery'); // necessary to use JQuery with other modules...
require('bootstrap'); // load bootstrap's JQuery plugins
require('angular-ui-router');
require('lodash');
require('restangular');

var postsFlux = angular.module('postsFlux', ['restangular', 'ui.router']);

postsFlux.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/posts');
	Restangular.setBaseUrl('http://jsonplaceholder.typicode.com');
	$stateProvider.state('posts', {
		url: '/posts',
		views: {
			"viewPosts": {
				templateUrl: "fragments/viewPosts.html",
				controller: function($scope, getAllPosts) {
					$scope.posts = getAllPosts;
				}
			},
			"viewPostDetails": {
				templateUrl: "fragments/viewPostDetails.html",
			},
		},
		resolve: {
			getAllPosts: function(Restangular) {
				Restangular.setBaseUrl('http://jsonplaceholder.typicode.com');
				return Restangular.all('posts').getList();
			},
		}
	})
	.state('posts.read', {
		url: '/{postId}',
		views: {
			"viewPostDetails@": {
				templateUrl: "fragments/viewPostDetails.html",
				controller: function($scope, getPost) {
					$scope.selectedPost = getPost;
				},
			},
		},
		resolve: {
			getPost: function(Restangular, $stateParams) {
				Restangular.setBaseUrl('http://jsonplaceholder.typicode.com');
				return Restangular.all('posts').get($stateParams.postId);
			}
		}
	});
}]);

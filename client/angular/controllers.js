// USERS CONTROLLER
myApp.controller('usersController', function ($scope, $location, userFactory, topicFactory, postFactory, commentFactory, $routeParams){

	// $scope.current_user = $routeParams.current_user;
	// $scope.selected_user = $routeParams.user_id;
	// userFactory.getUsers(function (data){
	// 	$scope.users = data;
	// });
	// userFactory.showUser($scope.selected_user, function (data){
	// 	$scope.selected_user = data;
	// });	

	$scope.addUser = function (){
		// console.log("login controller");
		if ($scope.new_user == undefined){
			$scope.error_message = "Need to input name";
		} else {
			$scope.error_message = '';
			userFactory.addUser($scope.new_user, function (data){
				// data refers to the entire current user object
				// $rootScope.current_user = data;
				$location.path('/dashboard/' + data.name);
			});
		}
	}
});


// PROFILE CONTROLLER - show profile of 1 selected user
myApp.controller('profileController', function ($scope, $routeParams, userFactory){
	$scope.selected_user = $routeParams.user_id;
	$scope.current_user = $routeParams.current_user;

	userFactory.showUser($scope.selected_user, function (data){
		$scope.selected_user = data;
	});		

	userFactory.getCurrentUser(function(current_user){
		// current user refers to the entire object
		$scope.current_user = current_user;
	});

});


// DASHBOARD CONTROLLER - shows all topics, add topic
myApp.controller('dashboardController', function ($scope, $location, topicFactory, userFactory, postFactory, commentFactory, $routeParams){
	// if using $rootScope:
	// $scope.current_user = $rootScope.current_user;

	$scope.current_user = $routeParams.current_user;
	userFactory.getCurrentUser(function(current_user){
		// current user refers to the entire object
		$scope.current_user = current_user;
	});

	// showing all topics
	topicFactory.getTopics(function (data){
		$scope.topics = data;
	});

	// add topic
	$scope.addTopic = function (){
		$scope.new_topic._user = $scope.current_user._id;
		topicFactory.addTopic($scope.new_topic, function (){
			topicFactory.getTopics(function (data){
				$scope.topics = data;
			});
			// set as empty array to clear fields after adding
			$scope.new_topic = {};
		});
	}

});


// TOPICS CONTROLLER - handles show one topic, add posts and comments
myApp.controller('topicsController', function ($scope, $location, $routeParams, userFactory, topicFactory, postFactory, commentFactory){

	$scope.current_user = $routeParams.current_user;

	userFactory.getCurrentUser(function(current_user){
		// current user refers to the entire object
		$scope.current_user = current_user;
	});


	$scope.selected_topic = $routeParams.topic_id;


	// THIS WAS CAUSING THE PROBLEM!!! there was nothing set to the $scope.selected_topic when it was called in the dashboardController
	// showing one topic
	topicFactory.getTopic($scope.selected_topic, function (data){
			postFactory.getPosts($scope.selected_topic, function (data){
				$scope.posts = data;
				
			});
		$scope.selected_topic = data;
	})

	$scope.addPost = function (){
		// console.log('addPost', $scope.new_post);
		$scope.new_post._user = $scope.current_user._id;
		$scope.new_post._topic = $scope.selected_topic._id;
		// userFactory.getCurrentUser( function (data){
			// console.log(data);
			// $scope.current_user._id = data.
		// })
		// $scope.new_post._user = $scope.current_user;
		// $scope.new_post._topic = $scope.selected_topic;
		postFactory.addPost($scope.new_post, function (){
			postFactory.getPosts($scope.new_post._topic, function (data){
				// console.log(data);
				// if (data._topic == $scope.selected_topic._id){
				$scope.posts = data;
				// }
			});
			$scope.new_post = {};
		});
	}

	// commentFactory.getComments(function (data){
	// 	$scope.comments = data;
	// });

	$scope.addComment = function (post_id, new_comment){
		// $scope.new_comment._topic = $scope.
		// post id, topic id, user id
		$scope.new_comment = {
			comment: new_comment,
			_post: post_id,
			_user: $scope.current_user._id,
			_topic: $scope.selected_topic._id
		};

		commentFactory.addComment($scope.new_comment, function (){
			// console.log($scope.selected_topic);
			console.log('testing');
			commentFactory.getComments($scope.selected_topic, function (data){
				console.log("this is the data for the comment controller", data)
				$scope.comments = data;
			});
			$scope.new_comment = {};
		});
	}

	// commentFactory.getComments($scope.selected_topic, function (data){
	// 	console.log("this is data for show comments", data);
	// 	$scope.comments = data;
	// })

});


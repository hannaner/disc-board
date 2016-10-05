// USER FACTORY
myApp.factory('userFactory', function ($http){

	var users = [];

	// current_user has entire user object
	var current_user;
	var factory = {};

	factory.getUsers = function (callback){
		$http.get('/users').success(function (output){
			callback(output);
		})
	}

	// getting user information for the specific post
	factory.getUserPost = function (info, callback){
		var url = '/posts/' + info + 'users';
		$http.get(url).success(function (output){
			callback(output);
		})
	}

	// show info/profile for 1 user
	factory.showUser = function (info, callback){
		var url = '/profile/' + info;
		$http.get(url).success(function (output){
			callback(output);
		})
	}

	factory.getCurrentUser = function(callback){
		callback(current_user);
	}

	factory.addUser = function (info, callback){
		$http.post('/users/create', info).success(function (output){
			// console.log('this is the whole user object', output);
			// current_user = output.name;
			current_user = output;
			callback(current_user);
		})
	}

	return factory;

});



// TOPICS FACTORY
myApp.factory('topicFactory', function ($http){

	var topics = [];

	var factory = {};


// show all topics
	factory.getTopics = function (callback){
		$http.get('/topics').success(function (output){
			callback(output);
		})
	}

// show specific topic page
	factory.getTopic = function (selected_topic, callback){
		// console.log(selected_topic);
		var url = '/topic/' + selected_topic;
		$http.get(url).success(function (output){
			callback(output);
		})
	}

	factory.addTopic = function (info, callback){
		// info refers to the entire topic object
		// console.log(info);
		$http.post('/topics/create', info).success(function (output){
			callback(output);
		})
	}

	return factory;

});


// POST FACTORY
myApp.factory('postFactory', function ($http){
	var factory = {};

	// show all posts for one topic
	factory.getPosts = function(info, callback){
		var url = '/posts/' + info;
		$http.get(url).success(function (output){
			// right now, output is referring to ALL posts.... but only want post to specific topic
			// console.log(output);
			callback(output);
		})
	}

	// add post to topic
	factory.addPost = function (info, callback){
		$http.post('/posts/create', info).success(function (output){
			callback();
		})
	}

	return factory;

});


// COMMENT FACTORY
myApp.factory('commentFactory', function ($http){
	var factory = {};

	factory.addComment = function (info, callback){
		$http.post('/comment/'+info._post, info).success(function (output){
			callback();
		})
	}

	factory.getComments = function (info, callback){
		console.log('this is info', info);
		// console.log("this is info.id", info._id);
		$http.get('/comments/'+info._id).success(function (output){
			console.log("this is the ouput for getComments", output);
			callback(output);
		})
	}

	return factory;
})
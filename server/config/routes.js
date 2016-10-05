var topics = require('./../controllers/topics.js');
var users = require('./../controllers/users.js');
var posts = require('./../controllers/posts.js');
var comments = require('./../controllers/comments.js');

module.exports = function(app){

	app.get('/users', function (req, res){
		users.show(req, res);
	});

// CREATE USER
	app.post('/users/create', function (req, res){
		users.create(req, res);
	});

// SHOW LIST OF TOPICS ON DASHBOARD
	app.get('/topics', function (req, res){
		topics.show(req, res);
	});


// CREATE TOPIC
	app.post('/topics/create', function (req, res){
		topics.create(req, res);
	});

// SHOW ONE TOPIC
	app.get('/topic/:id', function (req, res){
		topics.showone(req, res);
	})


// CREATE POST TO SPECIFIC TOPIC
	app.post('/posts/create', function (req, res){
		posts.create(req, res);
	})


// SHOW ALL POSTS FOR ONE TOPIC
	app.get('/posts/:id', function (req, res){
		posts.show(req, res);
	})


// SHOW ONE USER
	app.get('/profile/:id', function (req, res){
		users.show_user(req, res);
	})


// ADD COMMENT TO POST
	app.post('/comment/:id', function (req, res){
		comments.create(req, res);
	})

// SHOW COMMENTS
	app.get('/comments/:id', function (req, res){
		comments.show(req, res);
	})


}
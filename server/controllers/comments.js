var mongoose = require('mongoose');
var User = mongoose.model('User');
var Topic = mongoose.model('Topic');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

module.exports = ( function (){
	return {

		// showing al comments for a specific post to a specific topic
		show: function (req, res){
			// console.log("this is the req", req.params.id);
			Topic.findOne({_id: req.params.id}).populate('posts').exec(function (err, topics){
				Post.find({_topic: req.params.id}).populate('comments').populate('_user').exec(function (err, posts){
					// Comment.find(_post: )
					if (err){
						console.log("could not get comments");
					} else {
						// console.log("these are the results", posts);

						res.json(posts);
					}
					
				})
			})
		},

		// using deepPopulate module
		test: function (req, res){
			Topic.findOne({_id: req.params._id}).populate('posts').exec(function (err, results){
				console.log(results);
			})
		},

		create: function (req, res){
			var new_comment = new Comment({
				comment: req.body.comment,
				_post: req.body._post,
				_user: req.body._user,
				_topic: req.body._topic
			});

			new_comment.save(function (err, results){
				Topic.update({_id: req.body._topic}, {$push: {posts: results._id}}, function (err){
					if (err){
						console.log("can't update topic with comment id");
					} else {
						Post.update({_id: req.body._post}, {$push: {comments: results._id}}, function (err){
							if (err){
								console.log("cannot update post with comment");
							} else {
								console.log('successfully added comment!');
								res.json(results);
							}
						})
					}
				})
			})
		}



	}
})();
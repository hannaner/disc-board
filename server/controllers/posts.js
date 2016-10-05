var mongoose = require('mongoose');
var User = mongoose.model('User');
var Topic = mongoose.model('Topic');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

module.exports = ( function (){
	return{

		show: function (req, res){
			// console.log('this is the request', req);
			Post.find({_topic: req.params.id}).populate('_user').populate('comments').exec(function (err, results){
				if (err){
					console.log(err);
					// res.send(err);
				} else {
					res.json(results);
				}
			})
		},


		create: function (req, res){
			// console.log(req);
			var post = new Post({_topic: req.body._topic, _user: req.body._user, post: req.body.post});

			post.save(function (err, results){
				// console.log(results);
				Topic.update({_id: req.body._topic}, {$push: {posts: results._id}}, function (err){
					if (err){
						console.log("error with adding post!");
						// res.send(err);
					} else {
							User.update({_id: req.body._user}, {$push: {posts: results._id}}, function (err){
								if (err){
									console.log('could not update post to user');
									// res.send(err);
								} else {
									console.log('successfully updated post to user!');
								}
							})
						res.json(results);
					}		
				})
			});

		}




	}


})();
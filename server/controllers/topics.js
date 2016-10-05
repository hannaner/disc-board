var mongoose = require('mongoose');
var User = mongoose.model('User');
var Topic = mongoose.model('Topic');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

module.exports = ( function(){
	return {
		show: function(req, res){
			Topic.find({}).populate('_user').exec( function (err, results){
				if (err){
					console.log(err);
				} else {
					res.json(results);
				}
			})
		},

		showone: function(req, res){
			// console.log(req.params);
			Topic.findOne({_id: req.params.id}).populate('_user').exec( function (err, results){
				if (err){
					console.log(err);
					// res.end();
				} else {
					res.json(results);
				}
			})

		},

		// utilizing deepPopulate
		// test: function (req, res){
		// 	Topic.findOne
		// }

		create: function(req, res){

			// req.body._user is refering to the current user's id
			// console.log(req.body._user);
			// User.findOne({_id: req.body._user}, function (err, results){
				var topic = new Topic({topic: req.body.topic, description: req.body.description, category: req.body.category, _user: req.body._user});

				// topic._user = results._id;

				topic.save(function (err, results){
					// console.log(req.body);
					User.update({_id: req.body._user}, {$push: {topics: results._id}}, function (err){
					if (err){
						console.log("There are errors");
					} else {
						console.log("Successfully added a user!");
						res.json(results);

					}

					})

				})

			// })
		}

	}

})();
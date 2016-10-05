var mongoose = require('mongoose');
var User = mongoose.model('User');
var Topic = mongoose.model('Topic');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

module.exports = ( function(){
	return {

		show: function(req, res){
			User.find({}, function (err, results){
				if (err){
					console.log(err);
				} else {
					res.json(results);
				}
			})
		},

		create: function(req, res){
			var user = new User({name: req.body.name});
			user.save(function (err, results){
				if (err){
					console.log("There are errors");
				} else {
					// console.log(results)
					console.log("Successfully added a user!");
					res.json(results);
				}
			})
		},

		show_user: function (req, res){
			// console.log(req);
			User.find({_id: req.params.id}, function (err, results){
				if (err){
					console.log(err);
				} else {
					console.log('successfully found the user');
					res.json(results);
					console.log('this is the results', results);
				}
			})
		}


	}

})();
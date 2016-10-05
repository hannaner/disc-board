var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// CommentSchema.plugin(deepPopulate, options);

var CommentSchema = new mongoose.Schema({
	_user: {type: Schema.Types.ObjectId, ref: 'User'},
	// _topic: {type: Schema.Types.ObjectId, ref: 'Topic'},
	_post: {type: Schema.Types.ObjectId, ref: 'Post'},
	comment: String, 
	created: {type: Date, default: new Date}

});

mongoose.model('Comment', CommentSchema)
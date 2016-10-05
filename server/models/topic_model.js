var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// TopicSchema.plugin(deepPopulate, options);

var TopicSchema = new mongoose.Schema({

	_user: {type: Schema.Types.ObjectId, ref: 'User'},
	posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
	// comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
	// author: String,
	topic: String,
	description: String,
	category: String,
	created: {type: Date, default: new Date}

});

mongoose.model('Topic', TopicSchema);
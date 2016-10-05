var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// PostSchema.plugin(deepPopulate, options);

var PostSchema = new mongoose.Schema({

	_topic: {type: Schema.Types.ObjectId, ref: 'Topic'},
	_user: {type: Schema.Types.ObjectId, ref: 'User'},
	post: String,
	created: {type: Date, default: new Date},
	comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]

});

mongoose.model('Post', PostSchema)
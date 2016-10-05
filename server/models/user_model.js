var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// UserSchema.plugin(deepPopulate, options);

var UserSchema = new mongoose.Schema({

	name: String,
	created: {type: Date, default: new Date},
	topics: [{type: Schema.Types.ObjectId, ref: 'Topic'}],
	posts: [{type: Schema.Types.ObjectId, ref:'Post'}]
	// comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]

});

mongoose.model('User', UserSchema);
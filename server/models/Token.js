const {Schema, model} = require('mongoose');

const schema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	refreshToken: {
		type: String,
		required: true
	},
	// accessToken: 
	// exporesIn
}, {
	timestamps: true
});

module.exports = model('Token', schema);
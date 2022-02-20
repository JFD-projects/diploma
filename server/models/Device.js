const {Schema, model} = require('mongoose');

const schema = new Schema({
	name: {type: String},
	category: {type: Schema.Types.ObjectId, ref: 'Category'},
	brand: {type: Schema.Types.ObjectId, ref: 'Brand'},
	rate: Number,
	new: {type: Boolean},
	comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
	image: String,
	price: Number,
	available: Number
}, {
	timestamps: true
});

module.exports = model('Device', schema);
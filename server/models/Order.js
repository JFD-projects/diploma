const {Schema, model} = require('mongoose');

const schema = new Schema({
	products: [{type: Schema.Types.ObjectId, ref: 'Device'}],
	name: {
		type: String,
	},
	email: {type: String, required:true, unique: true},
	address: {type: String, required:true},
	tel: {type: Number, required:true},
	payMethod: {
		type: String
	},
	price: Number
}, {
	timestamps: true
});

module.exports = model('Order', schema);
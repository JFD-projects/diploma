const express = require('express');
const Order = require('../models/Order');
const router = express.Router({ mergeParams: true });
const authAdmin = require('../middleware/auth.admin.middleware');
const auth = require('../middleware/auth.middleware');

router.get('/', authAdmin, async (req, res) => {
	try {
		if (req.admin?._id) {
			const list = await Order.find();
			res.send(list);
		} else {
			res.status(401).json({ message: 'Unauthorized' });
		}
	} catch (error) {
		res.status(500).json({
			message: 'На серевере произошла ошибка',
		});
	}
});

router.patch('/:orderId', authAdmin, async (req, res) => {
	try {
		const { orderId } = req.params;
		if (req.admin?._id) {
			const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, { new: true });
			res.send(updatedOrder);
		} else {
			res.status(401).json({ message: 'Unauthorized' });
		}
	} catch (error) {
		res.status(500).json({
			message: 'На серевере произошла ошибка',
		});
	}
});

router.post('/', auth, async (req, res) => {
	try {
		if(req.user?._id){
			const newOrder = await Order.create({
				...req.body,
			});
			res.status(201).send(newOrder);
		}  else {
			res.status(401).json({ message: 'Unauthorized' });
		}		
	} catch (error) {
		res.status(500).json({
			message: 'На серевере произошла ошибка' + error.message,
		});
	}
});

module.exports = router;

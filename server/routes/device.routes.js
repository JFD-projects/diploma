const express = require('express');
const Device = require('../models/Device');
const router = express.Router({ mergeParams: true });
const authAdmin = require('../middleware/auth.admin.middleware');

router.get('/', async (req, res) => {
	try {
		const { orderBy, equalTo } = req.query;
		const list = await Device.find({ [orderBy]: equalTo });
		res.send(list);
	} catch (error) {
		res.status(500).json({
			message: 'На серевере произошла ошибка',
		});
	}
});

router.get('/search/:query', async (req, res) => {
	try {
		const { query } = req.params;
		const devices = await Device.find({
			name: { $regex: '^' + query, $options: 'i' },
		});
		res.status(201).send(devices);
	} catch {
		const { query } = req.params;
		res.status(500).json({
			message: 'На серевере произошла ошибка' + query,
		});
	}
});

router.get('/:deviceId', async (req, res) => {
	try {
		const { deviceId } = req.params;
		const list = await Device.findById(deviceId);
		res.send(list);
	} catch (error) {
		res.status(500).json({
			message: 'На серевере произошла ошибка',
		});
	}
});

router.post('/', authAdmin, async (req, res) => {
	try {
		if (req.admin?._id) {
			const newDevice = await Device.create({
				...req.body,
			});
			res.status(201).send(newDevice);
		} else {
			res.status(401).json({ message: 'Unauthorized' });
		}
	} catch (error) {
		res.status(500).json({
			message: 'На серевере произошла ошибка' + error.message,
		});
	}
});

router.patch('/:deviceId', authAdmin, async (req, res) => {
	try {
		const { deviceId } = req.params;
		if (req.admin?._id) {
			const updatedDevice = await Device.findByIdAndUpdate(deviceId, req.body, { new: true });
			res.send(updatedDevice);
		} else {
			res.status(401).json({ message: 'Unauthorized' });
		}
	} catch (error) {
		res.status(500).json({
			message: 'На серевере произошла ошибка',
		});
	}
});

router.delete('/:deviceId', authAdmin, async (req, res) => {
	try {
		const { deviceId } = req.params;
		const removedDevice = await Device.findById(deviceId);
		if (req.admin?._id) {
			await removedDevice.remove();
			return res.send(null);
		} else {
			res.status(401).json({ message: 'Unauthorized' });
		}
	} catch (error) {
		res.status(500).json({
			message: 'На серевере произошла ошибка',
		});
	}
});
module.exports = router;

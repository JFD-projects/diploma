const express = require('express');
const Category = require('../models/Category');
const router = express.Router({ mergeParams: true });
const authAdmin = require('../middleware/auth.admin.middleware');

router.get('/', async (req, res) => {
	try {
		const category = await Category.find();
		res.status(200).send(category);
	} catch (error) {
		res.status(500).json({
			message: 'На серевере произошла ошибка',
		});
	}
});

router.post('/', authAdmin, async (req, res) => {
	try {
		if (req.admin?._id) {
			const newCategory = await Category.create({
				...req.body,
			});
			res.status(201).send(newCategory);
		} else {
			res.status(401).json({ message: 'Unauthorized' });
		}
	} catch (error) {
		res.status(500).json({
			message: 'На серевере произошла ошибка' + error.message,
		});
	}
});

router.delete('/:categoryId',authAdmin, async(req, res) => {
	try {
		const {categoryId} = req.params;
		const removedCategory = await Category.findById(categoryId);
		if(req.admin?._id){
			await removedCategory.remove();
			return res.send(null)
		} else {
			res.status(401).json({message: 'Unauthorized'})
		}

	} catch (error) {
		res.status(500).json({
			message: 'На серевере произошла ошибка',
		});
	}
});

router.patch('/:categoryId', authAdmin, async (req, res) => {
	try {
		const { categoryId } = req.params;
		if (req.admin?._id) {
			const updatedCategory = await Category.findByIdAndUpdate(categoryId, req.body, { new: true });
			res.send(updatedCategory);
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

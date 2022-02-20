const express = require('express');
const Brand = require('../models/Brand')
const router = express.Router({mergeParams: true})
const auth = require('../middleware/auth.middleware');
const authAdmin = require('../middleware/auth.admin.middleware');

router.get('/', async (req, res) => {
	try {
		const brand = await Brand.find();
		res.status(200).send(brand)
	} catch (error) {
		res.status(500).json({
			message: 'На серевере произошла ошибка'
		})
	}
})

router.post('/', authAdmin, async (req, res) => {
	try{
		if(req.admin?._id){
			const newBrand = await Brand.create({
					...req.body
				})
			res.status(201).send(newBrand);
		} else {
			res.status(401).json({message: 'Unauthorized'})
		}
	} catch(error) {
		res.status(500).json({
			message: 'На серевере произошла ошибка' + error.message,
		});
	}
})

router.delete('/:brandId',authAdmin, async(req, res) => {
	try {
		const {brandId} = req.params;
		const removedBrand = await Brand.findById(brandId);
		if(req.admin?._id){
			await removedBrand.remove();
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

router.patch('/:brandId', authAdmin, async (req, res) => {
	try {
		const { brandId } = req.params;
		if (req.admin?._id) {
			const updatedBrand = await Brand.findByIdAndUpdate(brandId, req.body, { new: true });
			res.send(updatedBrand);
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
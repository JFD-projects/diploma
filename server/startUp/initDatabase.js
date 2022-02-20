const Brand = require('../models/Brand')
const Category = require('../models/Category')
const Device = require('../models/Device')

const brandMock = require('../mock/brands.json')
const categoryMock = require('../mock/categories.json')

module.exports = async () => {
	const brands = await Brand.find()
	// if(brands.length !== brandMock.length){
	// 	await createInitialEntity(Brand, brandMock)
	// }

	// const categories = await Category.find()
	// if(categories.length !== categoryMock.length){
	// 	await createInitialEntity(Category, categoryMock)
	// }

	// const devices = await Device.find();
	// if(devices.length !== deviceMock.length){
	// 	console.log(devices.length !== deviceMock.length)
	// 	await createInitialEntity(Device, deviceMock)
	// }
}

async function createInitialEntity(Model, data){
	await Model.collection.drop()
	return Promise.all(
		data.map(async item => {
			try {
				delete item._id
				const newItem = new Model(item)
				await newItem.save()
				return newItem	
			} catch (error) {
				return error
			}
		})
	)
}
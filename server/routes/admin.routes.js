const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const Admin = require('../models/Admin');
const { generateUserData } = require('../utils/helpers');
const tokenService = require('../services/token.service');
const router = express.Router({ mergeParams: true });
const authAdmin= require('../middleware/auth.admin.middleware');

router.post('/signInWithPassword', [
	check('email', 'Email некорректный').normalizeEmail().isEmail(),
	check('password', 'Пароль не может быть пустым').exists(),
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({
					error: {
						message: 'INVALID_DATA',
						code: 400,
					},
				});
			}

			const { email, password } = req.body;

			const existingAdmin = await Admin.findOne({ email });

			if (!existingAdmin) {
				return res.status(400).send({
					error: {
						message: 'EMAIL_NOT_FOUND',
						code: 400,
					},
				});
			}

			const isPasswordEqual = await bcrypt.compare(password, existingAdmin.password);

			if (!isPasswordEqual) {
				return res.status(400).send({
					error: {
						message: 'INVALID_PASSWORD',
						code: 400,
					},
				});
			}

			const tokens = tokenService.generateAdmin({ _id: existingAdmin._id });
			await tokenService.saveAdmin(existingAdmin._id, tokens.refreshToken);

			res.status(200).send({ ...tokens, adminId: existingAdmin._id });
		} catch (e) {
			res.status(500).json({
				message: 'На сервере произошла ошибка. Попробуйте позже',
			});
		}
	},
]);

// router.post('/signUp', [
// 	check('email', 'Некорректный email').isEmail(),
// 	check('password', 'Минимальная длина пароля 8 символов').isLength({ min: 8 }),
// 	async (req, res) => {
// 		try {
// 			const errors = validationResult(req);
// 			if (!errors.isEmpty()) {
// 				return res.status(400).json({
// 					error: {
// 						message: 'INVALID_DATA',
// 						code: 400,
// 					},
// 				});
// 			}

// 			const { email, password } = req.body;

// 			const exitingAdmin = await Admin.findOne({ email });

// 			if (exitingAdmin) {
// 				return res.status(400).json({
// 					error: {
// 						message: 'EMAIL_EXISTS',
// 						code: 400,
// 					},
// 				});
// 			}

// 			const hashedPassword = await bcrypt.hash(password, 12);

// 			const newAdmin = await Admin.create({
// 				...generateUserData(),
// 				...req.body,
// 				password: hashedPassword,
// 			});

// 			const tokens = tokenService.generate({ _id: newAdmin._id });
// 			await tokenService.save(newAdmin._id, tokens.refreshToken);

// 			res.status(201).send({ ...tokens, adminId: newAdmin._id });
// 		} catch (e) {
// 			res.status(500).json({
// 				message: 'На сервере произошла ошибка. Попробуйте позже' + e.message,
// 			});
// 		}
// 	},
// ]);


function isAdminTokenInvalid(data, dbToken) {
	return !data || !dbToken || data._id !== dbToken?.admin?.toString();
}

router.post('/token', async (req, res) => {
	try {
		const { refresh_token: refreshToken } = req.body;
		const data = tokenService.validateRefreshAdmin(refreshToken);
		const dbToken = await tokenService.findToken(refreshToken);

		if (isAdminTokenInvalid(data, dbToken)) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		const tokens = await tokenService.generateAdmin({
			_id: data._id,
		});
		await tokenService.saveAdmin(data._id, tokens.refreshToken);

		res.status(200).send({ ...tokens, userId: data._id });
	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка. Попробуйте позже',
		});
	}
});

// router.patch('/:AdminId', auth, async (req, res) => {
// 	try {
// 		const {AdminId} = req.params;
// 		if(AdminId === req.Admin._id){
// 			const updatedAdmin = await Admin.findByIdAndUpdate(AdminId, req.body, {new: true})
// 			res.send(updatedAdmin)
// 		} else {
// 			res.status(401).json({message: 'Unauthorized'})
// 		}
// 	} catch (error) {
// 		res.status(500).json({
// 			message: 'На серевере произошла ошибка',
// 		});
// 	}
// })

router.get('/', authAdmin, async (req, res) => {
	try {
		if(req.admin?._id){
			const list = await Admin.find();
			res.send(list);
		} else {
			res.status(401).json({ message: 'Unauthorized' });
		}
	} catch (error) {
		res.status(500).json({
			message: 'На сервере произошла ошибка',
		});
	}
});

router.get('/:adminId', authAdmin, async (req, res) => {
	try {
		const { adminId } = req.params;
		if (req.admin?._id) {
			const admin = await Admin.findById(adminId);
			if(admin) {
				res.send(admin);
			} else {
				res.status(401).json({ message: 'Admin does not exist' });
			}
			
		} else {
			res.status(401).json({ message: 'Unauthorized' });
		}
	} catch (error) {
		res.status(500).json({
			message: 'На сервере произошла ошибка',
		});
	}
});

module.exports = router;

export const loginValidation = {
	email: {
		isRequired: {
			message: 'Электронная почта обязательна для заполнения',
		},
		isEmail: {
			message: 'Email введен некорректно',
		},
	},
	password: {
		isRequired: {
			message: 'Пароль обязателен для заполнения',
		},
		isCapitalSymbol: {
			message: 'Пароль должен содержать хотя бы одну заглавную букву',
		},
		isContainDigit: {
			message: 'Пароль должен содержать хотя бы одно число',
		},
		min: {
			message: 'Пароль должен состоять минимум из 8 символов',
			value: 8,
		},
	},
};

export const adminLoginValidation = {
	email: {
		isRequired: {
			message: 'Электронная почта обязательна для заполнения',
		},
		isEmail: {
			message: 'Email введен некорректно',
		},
	},
	password: {
		isRequired: {
			message: 'Пароль обязателен для заполнения',
		},
		isContainDigit: {
			message: 'Пароль должен содержать хотя бы одно число',
		},
		min: {
			message: 'Пароль должен состоять минимум из 8 символов',
			value: 8,
		},
	},
};

export const registrationValidation = {
	email: {
		isRequired: {
			message: 'Электронная почта обязательна для заполнения',
		},
		isEmail: {
			message: 'Email введен некорректно',
		},
	},
	name: {
		isRequired: {
			message: 'Имя обязательно для заполнения',
		},
		min: {
			message: 'Имя должно состаять минимум из 3 символов',
			value: 3,
		},
	},
	password: {
		isRequired: {
			message: 'Пароль обязателен для заполнения',
		},
		isCapitalSymbol: {
			message: 'Пароль должен содержать хотя бы одну заглавную букву',
		},
		isContainDigit: {
			message: 'Пароль должен содержать хотя бы одно число',
		},
		min: {
			message: 'Пароль должен состаять миниму из 8 символов',
			value: 8,
		},
	},
	profession: {
		isRequired: {
			message: 'Обязательно выберите вашу профессию',
		},
	},
	license: {
		isRequired: {
			message: 'Вы не можете использовать наш сервис без подтреврждения лицензионного соглашения',
		},
	},
};

export const basketValidation = {
	name: {
		isRequired: {
			message: 'Имя обязательно для заполнения',
		},
		min: {
			message: 'Имя должно состаять минимум из 3 символов',
			value: 3,
		},
	},
	email: {
		isRequired: {
			message: 'Электронная почта обязательна для заполнения',
		},
		isEmail: {
			message: 'Email введен некорректно',
		},
	},
	tel: {
		isRequired: {
			message: 'Телефон обязателен для заполнения',
		},
	},
	address: {
		isRequired: {
			message: 'Адресс обязателен для заполнения',
		},
	},
};


export const deviceValidation = {
	name: {
		isRequired: {
			message: 'Имя обязательно для заполнения',
		},
	},
	category: {
		isRequired: {
			message: 'Выберите категорию',
		},
	},
	brand: {
		isRequired: {
			message: 'Выберите бренд',
		},
	},
	image: {
		isRequired: {
			message: 'Image обязательно для заполнения',
		},
	}
}
import React, { useState, useEffect } from 'react';
import { Form, Button, Checkbox } from 'antd';
import { useDispatch } from 'react-redux';
import { signUp } from '../../../store/user';
import { useHistory } from 'react-router-dom';
import { registrationValidation } from '../../../utils/validationConfig';
import { validator } from './../../../utils/validator';
import TextField from '../../common/form/textField';
import CheckBoxField from '../../common/form/checkBoxField';
import RadioField from '../../common/form/radioField';

const RegisterForm = () => {
	const [form] = Form.useForm();
	const [data, setData] = useState({
		email: '',
		password: '',
		tel: '',
		address: '',
		name: '',
		sex: 'male',
		license: false,
	});
	const dispatch = useDispatch();
	const history = useHistory();
	const [errors, setErrors] = useState({});

	const validate = () => {
		const errors = validator(data, registrationValidation);

		setErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleChange = (value, name) => {
		setData(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = () => {
		const isValid = validate();
		if (!isValid) return;
		const redirect = history.location.state ? history.location.state.from.pathname : '/';
		dispatch(signUp(data, redirect));
	};

	useEffect(() => {
		validate();
	}, [data]);

	const isValid = Object.keys(errors).length === 0;

	return (
		<>
			<h2 className='m-auto text-center'>Авторизация</h2>
			<Form form={form} onFinish={handleSubmit} className='pt-3 px-5'>
				<TextField name='name' error={errors.name} placeholder='Введите ваше имя...' value={data.name} onChange={handleChange} />
				<TextField name='email' placeholder='Введите ваш email...' value={data.email} error={errors.email} onChange={handleChange} />
				<TextField name='tel' error={errors.tel} placeholder='Введите ваш tel...' value={data.tel} onChange={handleChange} />
				<TextField name='address' error={errors.address} placeholder='Введите ваш address...' value={data.address} onChange={handleChange} />
				<TextField name='password' error={errors.password} placeholder='Введите ваш пароль...' value={data.password} onChange={handleChange} type='password' />

				<RadioField
					options={[
						{ name: 'Male', value: 'male' },
						{ name: 'Female', value: 'female' },
						{ name: 'Other', value: 'other' },
					]}
					value={data.sex}
					name='sex'
					className=''
					type='radio'
					onChange={handleChange}
					label='Выберите ваш пол'
				/>
				<Form.Item
					name='license'
					valuePropName={data.stayOn}
					onChange={() => setData(prev => ({ ...prev, license: !prev.license }))}
					
					validateStatus={!errors.license ? 'success' : 'error'}
					required
					className="m-0 mb-1"
					help={errors.license}>
					<Checkbox>Подтвердить лицензионное соглашение</Checkbox>
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button disabled={!isValid} htmlType='submit'>
						Регистрация
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default RegisterForm;

import React, { useState, useEffect } from 'react';
import { Form, Button, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from './../../../store/user';
import { useHistory } from 'react-router-dom';
import { getAuthErrors } from './../../../store/user';
import { validator } from './../../../utils/validator';
import { loginValidation } from './../../../utils/validationConfig';
import TextField from '../../common/form/textField';

const LoginForm = () => {
	const [data, setData] = useState({
		email: '',
		password: '',
		stayOn: false,
	});
	const [form] = Form.useForm();
	const history = useHistory();
	const dispatch = useDispatch();

	const [errors, setErrors] = useState({});
	const loginError = useSelector(getAuthErrors());

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
		dispatch(signIn(data, redirect));
	};

	const validate = () => {
		const errors = validator(data, loginValidation);

		setErrors(errors);
		return Object.keys(errors).length === 0;
	};

	useEffect(() => {
		validate();
	}, [data]);

	const isValid = Object.keys(errors).length === 0;

	return (
		<>
			<h2 className='m-auto text-center'>Вход</h2>
			<Form form={form} onFinish={handleSubmit} className='pt-3 px-5'>
				<TextField name='email' placeholder='Введите ваш email...' value={data.email} error={errors.email} onChange={handleChange} />
				<TextField name='password' type='password' placeholder='Введите ваш password...' value={data.password} error={errors.password} onChange={handleChange} />
				<Form.Item name='stayOn' valuePropName={data.stayOn} onChange={() => setData(prev => ({ ...prev, stayOn: !prev.stayOn }))} wrapperCol={{ offset: 8, span: 16 }}>
					<Checkbox>Remember me</Checkbox>
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button disabled={!isValid} htmlType='submit'>
						Войти
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default LoginForm;

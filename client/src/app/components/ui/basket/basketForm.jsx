import React, { useState, useEffect } from 'react';
import { Form, Button } from 'antd';
import { basketValidation } from '../../../utils/validationConfig';
import SelectField from '../../common/form/selectField';
import TextField from '../../common/form/textField';
import { validator } from './../../../utils/validator';

const BasketForm = ({ onSubmit }) => {
	const [data, setData] = useState({ name: '', email: '', tel: '', address: '', payMethod: '1' });
	const [errors, setErrors] = useState({});

	const categories = [
		{
			_id: 1,
			name: 'Оплата при получении',
		},
		{
			_id: 2,
			name: 'Оплата картой',
		},
	];
	
	const handleChange = (value, name) => {
		setData(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

	const validate = () => {
		const errors = validator(data, basketValidation);

		setErrors(errors);
		return Object.keys(errors).length === 0;
	};

	useEffect(() => {
		validate();
	}, [data]);

	const isValid = Object.keys(errors).length === 0;

	return (
		<Form onFinish={() => onSubmit(data)} className='pt-3 px-5'>
			<h5>Ваши контактные данные</h5>
			<div className='d-flex flex-row'>
				<TextField name='name' placeholder='Ваше имя' value={data.name} onChange={handleChange} error={errors.name} />
				<TextField name='tel' placeholder='Телефон' value={data.tel} onChange={handleChange} error={errors.tel} />
			</div>

			<TextField name='email' placeholder='Email' value={data.email} onChange={handleChange} error={errors.email} />

			<h5>Адрес Доставки</h5>
			<TextField name='address' placeholder='Город, улица, номер дома,  квартира' value={data.address} onChange={handleChange} error={errors.address} />

			<h5>Оплата</h5>
			<SelectField name='payMethod' options={categories} value={data.payMethod} onChange={handleChange} />

			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button disabled={!isValid} htmlType='submit'>
					Оформить Заказ
					</Button>
				</Form.Item>
		</Form>
	);
};

export default BasketForm;

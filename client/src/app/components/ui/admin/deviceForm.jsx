import React, { useState, useEffect } from 'react';
import { Form, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createDevice, updateDevice } from '../../../store/devices';
import { getCategories } from '../../../store/categories';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import { getBrands } from '../../../store/brands';
import { validator } from '../../../utils/validator';
import { deviceValidation } from '../../../utils/validationConfig';
import NumberField from '../../common/form/numberField';
import SwitchField from '../../common/form/switchFiled';

const DeviceForm = ({ device }) => {
	const [form] = Form.useForm();
	const [data, setData] = useState({
		name: '',
		category: '',
		brand: '',
		rate: 0,
		new: false,
		image: '',
		price: 0,
		available: 0,
	});

	const [errors, setErrors] = useState({});

	const dispatch = useDispatch();
	const brands = useSelector(getBrands());
	const categories = useSelector(getCategories());

	const handleChange = (value, name) => {
		setData(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = () => {
		const isValid = validate();
		if (!isValid) return;
		if (device) {
			dispatch(updateDevice(data));
		} else {
			dispatch(createDevice(data));
		}
		form.resetFields();
		setData({
			name: '',
			category: '',
			brand: '',
			rate: 0,
			new: false,
			image: '',
			price: 0,
			available: 0,
		});
	};

	const validate = () => {
		const errors = validator(data, deviceValidation);

		setErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const onChangeAll = data => {
		setData(data);
		form.setFieldsValue({
			...data,
		});
	};

	useEffect(() => {
		if (device) {
			form.resetFields();
			onChangeAll(device);
		}
	}, [device]);

	useEffect(() => {
		validate();
	}, [data]);

	const isValid = Object.keys(errors).length === 0;

	return (
		<Form form={form} onFinish={handleSubmit} style={{ width: 600 }} className='p-5'>
			<TextField name='name' label='Название товара' value={data?.name} placeholder='Укажите название товара' onChange={handleChange} error={errors.name} />

			<SelectField name='category' label='Категория' placeholder='Выберите категорию товара' value={data?.category} options={categories} onChange={handleChange} error={errors.category} />

			<SelectField name='brand' label='Бренд' placeholder='Выберите бренд товара' value={data?.brand} options={brands} onChange={handleChange} error={errors.brand} />

			<NumberField name='rate' label='Рейтинг' value={data?.rate} onChange={handleChange} />

			<SwitchField name='new' label='Новинка' value={data?.new} onChange={handleChange} />

			<TextField name='image' label='Картинка товара' value={data?.image} placeholder='Картинка товара' onChange={handleChange} error={errors.image} />

			<NumberField name='price' label='Цена товара' value={data?.rate} onChange={handleChange} />

			<NumberField name='available' label='К-во доступного товара' value={data?.available} onChange={handleChange} />

			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
				<Button disabled={!isValid} htmlType='submit'>
					{device?._id ? 'Обновить' : 'Добавить'}
				</Button>
			</Form.Item>
		</Form>
	);
};

export default DeviceForm;

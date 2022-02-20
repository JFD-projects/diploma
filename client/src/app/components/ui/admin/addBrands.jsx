import React, {useEffect, useState} from 'react';
import { validator } from '../../../utils/validator';
import { deviceValidation } from '../../../utils/validationConfig';
import { Form, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { createBrand } from '../../../store/brands';
import TextField from '../../common/form/textField';

const AddBrands = () => {
	const [data, setData] = useState({name: ''});
	const [error, setError] = useState({name: ''});
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	// useEffect(() => {
	// 	if (device) {
	// 		setData(device);
	// 	}
	// }, [device]);

	const handleSubmit = ()=> {
		// const isValid = validate();
		// if (!isValid) return;
		dispatch(createBrand(data))
		// if (device) {
		// 	dispatch(updateDevice(data));
		// } else {
		// 	dispatch(createDevice(data));
			
		// }
		form.resetFields();
		setData({name: ''})
		// setData({
		// 	name: '',
		// category: '',
		// brand: '',
		// rate: 0,
		// new: false,
		// image: '',
		// price: 0,
		// available: 0,
		// })
	};
	
	const handleChange = (value, name) => {
		setData(prevState => ({
			...prevState,
			[name]: value,
		}));
	};
	// const validate = () => {
	// 	const error = validator(data, deviceValidation);

	// 	setError(error);
	// 	return Object.keys(error).length === 0;
	// };

	// useEffect(() => {
	// 	validate();
	// }, [data]);

	// const isValid = Object.keys(error).length === 0;
	return ( 
		<Form form={form} onFinish={handleSubmit} style={{ width: 600 }} className='p-5'>
			<TextField name='name' label='Название бренда' value={data.name} placeholder='Укажите название бренда' onChange={handleChange} />

			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
				<Button htmlType='submit'>
					Добавить
				</Button>
			</Form.Item>
		</Form>
	 );
}
 
export default AddBrands;
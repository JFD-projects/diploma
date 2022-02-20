import React, {useState,} from 'react';
import { createCategory } from '../../../store/categories';
import { Form, Button } from 'antd';
import { useDispatch } from 'react-redux';
import TextField from '../../common/form/textField';

const AddCategory = () => {
	const [data, setData] = useState({name: '', identifier: ''});
	const [error, setError] = useState({});
	const [form] = Form.useForm();
	const dispatch = useDispatch()

	const handleSubmit = ()=> {
		dispatch(createCategory(data))
		form.resetFields();
		setData({name: ''});
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
			<TextField name='name' label='Название категории' value={data.name} placeholder='Укажите название категории' onChange={handleChange} />
			<TextField name='identifier' label='Идентификатор' value={data.identifier} placeholder='Укажите идентификатор категории' onChange={handleChange} />

			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
				<Button htmlType='submit'>
					Добавить
				</Button>
			</Form.Item>
		</Form>
	 );
}
 
export default AddCategory;
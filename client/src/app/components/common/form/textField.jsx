import React from 'react';
import { Form, Input } from 'antd';
const TextField = ({ name, label, placeholder, value = '', type, onChange, error }) => {
	return (
		<Form.Item label={label} name={name} validateStatus={!error ? 'success' : 'error'} required help={error}>
			{type === 'password' ? <Input.Password placeholder={placeholder} onChange={({target}) => onChange(target.value, name)} /> : <Input placeholder={placeholder} onChange={({target}) => onChange(target.value, name)} />}
		</Form.Item>
	);
};

export default TextField;

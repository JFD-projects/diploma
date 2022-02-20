import React from 'react';
import { Form, InputNumber } from 'antd';

const NumberField = ({ name, label, placeholder, value = 0, type, onChange, error }) => {
	return ( 
		<Form.Item label={label} name={name} validateStatus={!error ? 'success' : 'error'} required help={error}>
			<InputNumber min={1} value={value} onChange={(value) => onChange(value, name)} />
		</Form.Item>
	 );
}
 
export default NumberField;
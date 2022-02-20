import React from 'react';
import { Select, Form } from 'antd';

const { Option } = Select;

const SelectField = ({ value, label, name, placeholder, options, onChange, error }) => {
	return (
		<Form.Item label={label} name={name} validateStatus={!error ? 'success' : 'error'} required  help={error} >
			<Select placeholder={placeholder} value={value} style={{ width: 120 }} onChange={value => onChange(value, name)}>
				{options.map(opt => (
					<Option key={opt._id} value={opt._id}>{opt.name}</Option>
				))}
			</Select>
		</Form.Item>
	);
};

export default SelectField;

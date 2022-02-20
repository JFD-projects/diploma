import React from 'react';
import { Switch, Form } from 'antd';

const SwitchField = ({ label, name, value, error, onChange }) => {
	return (
		<Form.Item label={label} name={name} validateStatus={!error ? 'success' : 'error'} required help={error}>
			<Switch checked={value} onChange={value => onChange(value, name)} />
		</Form.Item>
	);
};

export default SwitchField;

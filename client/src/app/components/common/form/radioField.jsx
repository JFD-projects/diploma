import React from 'react';
import { Form, Radio } from 'antd';
const RadioField = ({  label, name, onChange, value, options }) => {
	return (
		<Form.Item name={name} label={label}>
			<Radio.Group defaultValue={value} onChange={({target}) => onChange(target.value, name)}>
				{
					options.map(option => (
						<Radio key={option.value + 1} value={option.value}>{option.name}</Radio>
					))
				}
			</Radio.Group>
		</Form.Item>
	);
};

export default RadioField;

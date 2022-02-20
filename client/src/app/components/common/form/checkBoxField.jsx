import React from 'react';
import { Checkbox, Alert } from 'antd';

const CheckBoxField = ({ options, className, error, onChange }) => {
	const optionsArray = Object.keys(options).map(optionName => ({
		label: options[optionName].name,
		value: options[optionName]._id,
	}));

	const handleChange = value => {
		onChange(value);
	};

	return (
		<>
			<Checkbox.Group className={className} options={optionsArray} onChange={handleChange} />
			{error && <Alert message={error} type='error' showIcon />}
		</>
	);
};

export default CheckBoxField;

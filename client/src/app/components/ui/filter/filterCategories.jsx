import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckBoxField from '../../common/form/checkBoxField';
import { getCategories } from '../../../store/categories';
import { setFilter } from '../../../store/devices';

const FilterCategories = () => {
	const categories = useSelector(getCategories());
	const dispatch = useDispatch();
	const handleChange = value => {
		dispatch(setFilter({ name: 'category', value }));
	};
	return (
		<>
			<h5>Категория</h5>
			<CheckBoxField options={categories} className='d-flex flex-column' onChange={handleChange} />
		</>
	);
};

export default FilterCategories;

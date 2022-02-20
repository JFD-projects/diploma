import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBrands } from './../../../store/brands';
import { setFilter } from './../../../store/devices';
import CheckBoxField from '../../common/form/checkBoxField';

const FilterBrands = () => {
	const dispatch = useDispatch();
	const brands = useSelector(getBrands());
	const handleChange = value => {
		dispatch(setFilter({ name: 'brand', value }));
	}
	return (
		<>
			<h5>Бренд</h5>
			<CheckBoxField options={brands} className='d-flex flex-column' onChange={handleChange} />
		</>
	);
};

export default FilterBrands;

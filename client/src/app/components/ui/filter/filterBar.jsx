import React from 'react';
import { Row, Col } from 'antd';
import FilterBrands from './filterBrands';
import FilterPrice from './filterPrice';
import FilterSortPrice from './filterSortPrice';
import FilterCategories from './filterCategories';
import { useSelector } from 'react-redux';
import { getIsAdminLoggedIn } from '../../../store/admin';

const FilterBar = () => {
	const isAdminAuth = useSelector(getIsAdminLoggedIn());

	return (
		<Row className='d-flex flex-column'>
			<h2>Фильтры</h2>
			<Col>
				<FilterSortPrice />
			</Col>
			<Col>
				<FilterBrands />
			</Col>
			{isAdminAuth && (
				<Col>
					<FilterCategories />
				</Col>
			)}

			<Col>
				<FilterPrice />
			</Col>
		</Row>
	);
};

export default FilterBar;

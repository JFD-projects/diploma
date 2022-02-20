import React from 'react';
import { Button, Row } from 'antd';
import { BsSortDown, BsSortUp } from 'react-icons/bs';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { setSortFilter, getSortFilter } from '../../../store/devices';

const FilterSortPrice = () => {
	const dispatch = useDispatch();
	const sortFilter = useSelector(getSortFilter());

	const handleChange = () => {
		if (sortFilter === 'asc') {
			dispatch(setSortFilter('desc'));
		} else {
			dispatch(setSortFilter('asc'));
		}
	};
	return (
		<Row className='flex-row w-100 flex-nowrap'>
			<Button className={sortFilter ? 'btn-sort w-100' : 'btn-default w-100'} onClick={handleChange}>
				по цене <span className="ms-3">{sortFilter === 'asc' ? <BsSortUp /> : <BsSortDown />}</span>
			</Button>
			{sortFilter && (
				<p onClick={() => dispatch(setSortFilter(null))}>
					<AiOutlineCloseCircle />
				</p>
			)}
		</Row>
	);
};

export default FilterSortPrice;

import React from 'react';
import { Select } from 'antd';
import { DEVICE_ROUTE } from '../../utils/routeConsts';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../store/categories';
import { Link } from 'react-router-dom';
import { loadSearchList, getSearchResults } from '../../store/search';
import { getIsAdminLoggedIn } from './../../store/admin';

const SearchDevices = () => {
	const dispatch = useDispatch();
	const isAdminAuth = useSelector(getIsAdminLoggedIn())
	const filteredData = [];

	const categories = useSelector(getCategories());
	const data = useSelector(getSearchResults());

	categories.map(category => {
		if (data.find(el => el.category === category._id)) {
			filteredData.push({ category, entities: data.filter(el => el.category === category._id) });
		}
	});

	const onSearch = value => {
		dispatch(loadSearchList(value));
	};

	return (
		<Select showSearch className='w-100' onSearch={onSearch} filterOption={false} notFoundContent={null} placeholder='Поиск товара'>
			{filteredData.map(({ category, entities }) => (
				<Select.OptGroup key={category._id} label={<span>{category.name}</span>}>
					{entities.map(device => (
						<Select.Option key={device._id}>
							<Link className='dataItem' to={isAdminAuth ? `${DEVICE_ROUTE}/${device._id}` : `${DEVICE_ROUTE}/${category.identifier}/${device._id}`}>
								<p>{device.name} </p>
							</Link>
						</Select.Option>
					))}
				</Select.OptGroup>
			))}
		</Select>
	);
};

export default SearchDevices;

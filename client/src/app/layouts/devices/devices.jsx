import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from 'antd';

import DeviceCard from '../../components/ui/device/deviceCard';
import { loadDevicesLit } from '../../store/devices';
import { getCategory } from '../../store/categories';
import DevicePage from '../../components/page/devicePage/devicePage';
import { getIsAdminLoggedIn } from '../../store/admin';
import DevicePageEdit from '../../components/page/devicePage/devicePageEdit';
const { Content } = Layout;

const Devices = () => {
	const { deviceId, category } = useParams();
	const isAdminAuth = useSelector(getIsAdminLoggedIn());
	const dispatch = useDispatch();
	const categoryItem = useSelector(getCategory(category));
	useEffect(() => {
		if (!category) {
			dispatch(loadDevicesLit());
		} else {
			if (categoryItem) {
				dispatch(loadDevicesLit('category', categoryItem?._id));
			}
		}
	}, [category]);

	return <Content className='main'>
		{
			deviceId ? 
				(isAdminAuth ? <DevicePageEdit /> :
				<DeviceCard />) :  <DevicePage />
		}
	</Content>
};

export default Devices;

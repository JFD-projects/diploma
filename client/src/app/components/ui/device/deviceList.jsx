import React from 'react';
import { Spin, Row } from 'antd';
import { useSelector } from 'react-redux';

import { getDevicesLoadingStatus } from '../../../store/devices';
import DeviceItem from './deviceItem';
import { getFilteredDevices } from '../../../store/devices';

const DeviceList = () => {
	const isLoading = useSelector(getDevicesLoadingStatus());
	const filteredDevices = useSelector(getFilteredDevices())

	return (
		<>
		<Row gutter={[16, 16]}>
			{
				!isLoading ? filteredDevices.map(device => <DeviceItem key={device._id} device={device} />) : <Spin size="large" />
			}
		</Row>
			{!isLoading && !filteredDevices.length && <h5>No devices</h5>}
		</>
	 );
}
 
export default DeviceList;
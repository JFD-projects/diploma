import React from 'react';
import { Col, Layout, Row } from 'antd';

import FilterBar from '../../ui/filter/filterBar';
import DeviceList from '../../ui/device/deviceList';
import Pages from '../../common/Pages';

const DevicePage = () => {
	
	return (
		<Layout className='h-100'>
			<Row className='h-100'>
				<Col span={6} className="px-4">
					<FilterBar />
				</Col>
				<Col span={18} className='device-list p-2'>
					<DeviceList />
					{/* <Pages /> */}
				</Col>
			</Row>
		</Layout>
	);
};

export default DevicePage;

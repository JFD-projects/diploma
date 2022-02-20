import React from 'react';
import { Layout, Row, Col, Button } from 'antd';
import DeviceForm from '../../ui/admin/deviceForm';
import { getDeviceById } from '../../../store/devices';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BiArrowBack } from 'react-icons/bi';

const DevicePageEdit = () => {
	const { deviceId } = useParams();
	const history = useHistory();
	const device = useSelector(getDeviceById(deviceId));
	return (
		<Layout className='px-5 align-items-center'>
			<h2>Изменить </h2>
			<Row>
				<Col>
					<Button className='btn-default ' onClick={() => history.goBack()}>
						<BiArrowBack /> Назад
					</Button>
				</Col>
				<Col>
					<DeviceForm device={device} />
				</Col>
			</Row>
		</Layout>
	);
};

export default DevicePageEdit;

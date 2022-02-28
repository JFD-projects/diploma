import React from 'react';
import { useSelector } from 'react-redux';
import { Layout, Row,Col} from 'antd';

import { getCurrentAdminData } from '../../../store/admin';

const { Content } = Layout;

const AdminProfile = () => {
	const admin = useSelector(getCurrentAdminData());

	return (
		<Content
			className='site-layout-background'
			style={{
				margin: '24px 16px',
				padding: 24,
				minHeight: '60vh',
			}}>
			<Row>
				<Col>
					<p>Имя</p>
					<h2>{admin.name}</h2>
				</Col>
				<Col>
					<p>Email</p>
					<p>{admin.email}</p>
				</Col>
			</Row>
			{/* <UserProfileInformation user={admin} /> */}
			{/* {activeTab === 'profile' ? <UserProfileInformation user={admin} /> : activeTab === 'catalog' ? <Devices /> : activeTab === 'orders' ? <p>Will be added soon...</p> : <AddPage />} */}
		</Content>
	);
};

export default AdminProfile;

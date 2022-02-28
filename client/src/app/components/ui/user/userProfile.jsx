import React from 'react';
import { useSelector } from 'react-redux';
import { getCurrentUserData } from '../../../store/user';
import UserProfileInformation from './userProfileInformation';
import { Layout, Row,Col, Tabs, Image } from 'antd';
import Favorite from '../../../layouts/favorite/favorite';

const { TabPane } = Tabs;

const UserProfile = () => {
	const user = useSelector(getCurrentUserData());

	return (
		<Layout className='pt-3' style={{height: '90vh'}}>
			<Row>
				<Col md={4} lg={4}>
					<Image className='w-100 user-img' src={user.image} alt={user.name} />
				</Col>
				<Col md={20} lg={20}>
					<Tabs type='card' className='mb-3'>
						<TabPane tab='Профиль' key='profile' eventKey='profile' >
							<UserProfileInformation user={user} />
						</TabPane>
						<TabPane eventKey='orders' tab='Мои заказы'>
							orders will be created soon
						</TabPane>
						<TabPane tab='Избраное' key='favorite'>
							<Favorite />
						</TabPane>
					</Tabs>
				</Col>
			</Row>
		</Layout>
	);
};

export default UserProfile;

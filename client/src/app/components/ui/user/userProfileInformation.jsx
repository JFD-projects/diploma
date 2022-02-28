import React from 'react';
import { Col, Row, Typography } from 'antd';

const UserProfileInformation = ({ user }) => {
	return (
		<Row gutter={16}>
			<Col span={8}>
				<Typography.Title level={5}>Имя</Typography.Title>
				<h2>{user.name}</h2>
			</Col>
			<Col span={8} offset={8}>
				<Row>
					<Typography.Title level={5} className='pr-3'>Email</Typography.Title>
					<p>{user.email}</p>
				</Row>
				<Row >
					<Typography.Title level={5} className='pr-3'>Адресс</Typography.Title>
					<p>{user?.address}</p>
				</Row>
				<Row>
					<Typography.Title level={5} className='pr-3'>Телефон</Typography.Title>
					<p>{user?.tel}</p>
				</Row>
			</Col>
		</Row>
	);
};

export default UserProfileInformation;

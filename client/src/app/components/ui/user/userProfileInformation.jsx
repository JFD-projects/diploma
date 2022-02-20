import React from 'react';
import {Col, Row} from "react-bootstrap";

const UserProfileInformation = ({ user }) => {
	return (
		<Row>
			<Col>
				<p>Имя</p>
				<h2>{user.name}</h2>
			</Col>
			<Col>
				<p>Email</p>
				<p>{user.email}</p>
			</Col>
		</Row>
	);
};

export default UserProfileInformation;

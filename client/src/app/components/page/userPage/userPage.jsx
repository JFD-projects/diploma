import React from 'react';
import { Spin } from 'antd';
import UserProfile from './../../ui/user/userProfile';
import { useSelector } from 'react-redux';
import {  getUsersLoadingStatus } from '../../../store/user';

const UserPage = () => {
	const userLoading = useSelector(getUsersLoadingStatus());

	if (userLoading) {
		return <Spin size="large" />;
	}
	return <UserProfile />;
};

export default UserPage;

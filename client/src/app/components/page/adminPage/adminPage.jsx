import React from 'react';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';

import { getAdminLoadingStatus } from '../../../store/admin';
import AdminProfile from '../../ui/admin/adminProfile';

const AdminPage = () => {
	const isAdminLoadingStatus = useSelector(getAdminLoadingStatus());
	return !isAdminLoadingStatus ? <AdminProfile /> : <Spin size='large' />;
};

export default AdminPage;

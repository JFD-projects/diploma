import React from 'react';
import { useSelector } from 'react-redux';
import { Layout, Card } from 'antd';

import './admin.sass';
import { getIsAdminLoggedIn } from '../../store/admin';
import AdminPage from '../../components/page/adminPage';
import SignIn from '../../components/ui/admin/signIn';

const { Content } = Layout;

const Admin = () => {
	const isAdminAuth = useSelector(getIsAdminLoggedIn());

	if (isAdminAuth) {
		return <AdminPage />;
	}

	return (
		<Content className='auth-content'>
			<Card className='auth-form'>
				<SignIn />
			</Card>
		</Content>
	);
};

export default Admin;

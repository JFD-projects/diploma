import React  from 'react';
import { useSelector } from 'react-redux';

import { getUserIsLoggedIn } from './../store/user';
import UserPage from '../components/page/userPage/userPage';
import { getIsAdminLoggedIn } from '../store/admin';
import AdminPage from '../components/page/adminPage';
import SignIn from '../components/ui/admin/signIn';
import { Layout } from 'antd';

const Admin = () => {
	const isAdminAuth = useSelector(getIsAdminLoggedIn()); 
	const isUserAuth = useSelector(getUserIsLoggedIn()); 

	if (isUserAuth) {
		return <UserPage />;
	}

	if (isAdminAuth) {
		return <AdminPage />;
	}

	return (
		<Layout className='d-flex justify-content-center align-items-center flex-column mt-5'>
			<SignIn />
		</Layout>
	);
};

export default Admin;

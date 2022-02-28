import React  from 'react';
import { useSelector } from 'react-redux';

import { getUserIsLoggedIn } from '../../store/user';
import UserPage from '../../components/page/userPage/userPage';
import Login from '../auth/login';
import { Layout } from 'antd';


const User = () => {
	const isUserAuth = useSelector(getUserIsLoggedIn()); 

	if (isUserAuth) {
		return <UserPage />;
	}

	return (
		<Layout className='d-flex justify-content-center align-items-center flex-column mt-5'>
			<Login />
		</Layout>
	);
};

export default User;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';

import './auth.sass'
import { logOut } from '../../store/user';
import { getIsAdminLoggedIn, logOutAdmin } from '../../store/admin';
import { getUserIsLoggedIn } from '../../store/user';

const LogOut = () => {
	const isAdminAuth = useSelector(getIsAdminLoggedIn());
	const isUserAuth = useSelector(getUserIsLoggedIn());

	const dispatch = useDispatch();
	useEffect(() => {
		if (isUserAuth) {
			dispatch(logOut());
		} else if (isAdminAuth) {
			dispatch(logOutAdmin());
		}
	}, []);

	return <Spin size='large' />;
};

export default LogOut;

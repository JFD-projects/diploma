import React from 'react';
import { NavLink, useLocation } from 'react-router-dom/';
import { Layout, Card } from 'antd';

import './auth.sass'
import LoginForm from '../../components/ui/auth/loginForm';
import RegisterForm from '../../components/ui/auth/registerForm';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/routeConsts';

const {Content} = Layout;

const Login = () => {
	const location = useLocation();
	const isLogin = location.pathname === LOGIN_ROUTE;

	return (
		<Content className='auth-content'>
			<Card className='auth-form'>
				{isLogin ? (
					<>
						<LoginForm />
					</>
				) : (
					<>
						<RegisterForm />
					</>
				)}
				{isLogin ? (
					<div className='text-center'>
						Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
					</div>
				) : (
					<div className='text-center'>
						Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
					</div>
				)}
			</Card>
		</Content>
	);
};

export default Login;

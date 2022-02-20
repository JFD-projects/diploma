import React from 'react';
import { NavLink, useLocation } from 'react-router-dom/';
import { Layout, Card } from 'antd';
import LoginForm from '../components/ui/auth/loginForm';
import RegisterForm from '../components/ui/auth/registerForm';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/routeConsts';

const Login = () => {
	const location = useLocation();
	const isLogin = location.pathname === LOGIN_ROUTE;

	return (
		<Layout className='d-flex justify-content-center align-items-center flex-column pt-5'>
			<Card style={{ width: 600 }} className='p-2'>
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
		</Layout>
	);
};

export default Login;

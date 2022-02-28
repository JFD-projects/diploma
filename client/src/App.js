import React from 'react';
import './app/styles/App.sass';
import NavBar from './app/components/ui/navBar';
import AppRouter from './app/components/common/appRouter';
import AppLoader from './app/components/ui/hoc/appLoader';
import { useSelector } from 'react-redux';
import { getIsAdminLoggedIn } from './app/store/admin';
import SideBar from './app/components/ui/admin/sidebar/sidebar';
import Layout from 'antd/lib/layout/layout';

function App() {
	const isAdminAuth = useSelector(getIsAdminLoggedIn());
	return (
		<AppLoader>
			<Layout className={isAdminAuth ? 'main-admin' : 'main'}>
				{isAdminAuth ? <SideBar /> : <NavBar />}
				<AppRouter />
			</Layout>
		</AppLoader>
	);
}

export default App;

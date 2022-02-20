import React from 'react';
import NavBar from './app/components/ui/navBar';
import AppRouter from './app/components/common/appRouter';
import AppLoader from './app/components/ui/hoc/appLoader';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getIsAdminLoggedIn } from './app/store/admin';

function App() {
const isAdminAuth = useSelector(getIsAdminLoggedIn())
	return (
		<AppLoader>
			{!isAdminAuth && <NavBar />}
			<AppRouter />
			<ToastContainer />
		</AppLoader>
	);
}

export default App;

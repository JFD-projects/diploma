import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { publicRoutes, authRoutes, adminRoutes } from '../../../routes';
import { SHOP_ROUTE } from '../../utils/routeConsts';
import { getUserIsLoggedIn } from '../../store/user';
import { getIsAdminLoggedIn } from '../../store/admin';

const AppRouter = () => {
	const isUserAuth = useSelector(getUserIsLoggedIn());
	const isAdminAuth = useSelector(getIsAdminLoggedIn());
	return (
		<Switch>
			{isAdminAuth && adminRoutes.map(({ path, Component }) => <Route key={path} path={path} component={Component} exact />)}
			{isUserAuth && authRoutes.map(({ path, Component }) => <Route key={path} path={path} component={Component} exact />)}
			{publicRoutes.map(({ path, Component }) => {
				if (!isAdminAuth) return <Route key={path} path={path} component={Component} exact />;
			})}
			<Redirect to={SHOP_ROUTE} />
		</Switch>
	);
};

export default AppRouter;

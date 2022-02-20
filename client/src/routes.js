import { ADMIN_ROUTE, BASKET_ROUTE, FAVORITE_ROUTE, USER_ROUTE, LOG_OUT, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from './app/utils/routeConsts';

import Main from './app/layouts/main';
import Devices from './app/layouts/devices';
import Login from './app/layouts/login';
import Admin from './app/layouts/admin';
import LogOut from './app/layouts/logOut';
import Basket from './app/layouts/basket';
import Favorite from './app/layouts/favorite';

export const adminRoutes = [
	{
		path: SHOP_ROUTE,
		Component: Admin,
	},
	// {
	// 	path: DEVICE_ROUTE + '/add',
	// 	Component: Devices,
	// 	admin: true
	// },
	{
		path: DEVICE_ROUTE + '/:deviceId?',
		Component: Devices
	},

	{
		path: LOG_OUT,
		Component: LogOut,
	},
];

export const authRoutes = [
	{
		path: USER_ROUTE + '/:userId',
		Component: Admin,
	},
	{
		path: LOG_OUT,
		Component: LogOut,
	},
	// {
	//     path: BASKET_ROUTE,
	//     Component: Basket
	// },
];

export const publicRoutes = [
	{
		path: SHOP_ROUTE,
		Component: Main,
	},
	{
		path: DEVICE_ROUTE + '/:category?/:deviceId?',
		Component: Devices
		
	},
	{
		path: LOGIN_ROUTE,
		Component: Login,
	},
	{
		path: REGISTRATION_ROUTE,
		Component: Login,
	},
	{
		path: BASKET_ROUTE,
		Component: Basket,
	},
	{
		path: ADMIN_ROUTE,
		Component: Admin,
	},
	{
		path: FAVORITE_ROUTE,
		Component: Favorite
	}
];

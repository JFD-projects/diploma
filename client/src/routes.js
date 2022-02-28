import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    CATALOG_ROUTE,
    FAVORITE_ROUTE,
    USER_ROUTE,
    LOG_OUT,
    DEVICE_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE,
    PROFILE_ROUTE,
    ADD_ROUTE,
	ORDERS_ROUTE
} from './app/utils/routeConsts';

import Main from './app/layouts/main/main';
import Devices from './app/layouts/devices/devices';
import Login from './app/layouts/auth/login';
import Admin from './app/layouts/admin/admin';
import LogOut from './app/layouts/auth/logOut';
import Basket from './app/layouts/basket/basket';
import Favorite from './app/layouts/favorite/favorite';
import User from './app/layouts/user/user';
import Orders from './app/layouts/orders/orders';
import AddProducts from './app/layouts/admin/addProducts';

export const adminRoutes = [
	{
		path: SHOP_ROUTE,
		Component: Admin,
	},
	{
		path: ORDERS_ROUTE,
		Component: Orders,
	},
	{
		path: CATALOG_ROUTE,
		Component: Devices
	},
	{
		path: DEVICE_ROUTE + '/:deviceId',
		Component: Devices
	},
	{
		path: ADD_ROUTE,
		Component: AddProducts
	},
	{
		path: LOG_OUT,
		Component: LogOut,
	},
];

export const authRoutes = [
	{
		path: USER_ROUTE + '/:userId',
		Component: User,
	},
	{
		path: LOG_OUT,
		Component: LogOut,
	},
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

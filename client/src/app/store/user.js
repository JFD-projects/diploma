import { createAction, createSlice } from '@reduxjs/toolkit';
import authService from '../services/auth.service';
import localStorageService from '../services/localStorage.service';
import userService from '../services/user.service';
import { generateAuthError } from '../utils/generateAuthError';
import history from '../utils/history';
import { openNotification } from '../components/common/notification';

const favoritesItems = (localStorage.getItem('favorites') && JSON.parse(localStorage.getItem('favorites'))) || [];

const initialState =
	localStorageService.getAccessToken() && !localStorageService.getAdmin()
		? {
				entities: null,
				isLoading: true,
				error: null,
				auth: { userId: localStorageService.getUserId() },
				favoritesList: favoritesItems,
				isLoggedIn: true,
				//   dataLoaded: false
		  }
		: {
				entities: null,
				isLoading: false,
				error: null,
				auth: null,
				isLoggedIn: false,
				favoritesList: [],
				//   dataLoaded: false
		  };

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		userRequested: state => {
			state.isLoading = true;
		},
		userReceived: (state, action) => {
			state.entities = action.payload;
			state.dataLoaded = true;
			state.isLoading = false;
		},
		userRequestFiled: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		authRequestSuccess: (state, action) => {
			state.auth = action.payload;
			state.isLoggedIn = true;
		},
		authRequestFailed: (state, action) => {
			state.error = action.payload;
		},
		userCreated: (state, action) => {
			state.entities.push(action.payload);
		},
		userLoggedOut: state => {
			state.entities = null;
			state.isLoggedIn = false;
			state.auth = null;
			state.dataLoaded = false;
		},
		userUpdateSuccessed: (state, action) => {
			state.entities[state.entities.findIndex(u => u._id === action.payload._id)] = action.payload;
		},
		authRequested: state => {
			state.error = null;
		},
		userFavoriteDeviceAdded: (state, action) => {
			state.favoritesList.push({ ...action.payload.product, amount: 1 });
			action.payload.isAuth && localStorage.setItem('favorites', JSON.stringify(state.favoritesList));
		},
		userFavoriteDeviceDeleted: (state, action) => {
			state.favoritesList = state.favoritesList.filter(p => p._id !== action.payload.id);
			action.payload.isAuth && localStorage.setItem('favorites', JSON.stringify(state.favoritesList));
		},
	},
});

const { reducer: userReducer, actions } = userSlice;
const { userRequested, userReceived, userRequestFiled, authRequestFailed, authRequestSuccess, userLoggedOut, userUpdateSuccessed, userFavoriteDeviceAdded, userFavoriteDeviceDeleted } = actions;

const authRequested = createAction('users/authRequested');
const userUpdateFailed = createAction('users/userUpdateFailed');
const userUpdateRequested = createAction('users/userUpdateRequested');

export const loadCurrentUserData = () => async dispatch => {
	dispatch(userRequested());
	try {
		const data = await userService.getCurrentUser();
		dispatch(userReceived(data));
	} catch (error) {
		dispatch(userRequestFiled(error.message));
	}
};

export const signIn = (payload, redirect) => async (dispatch, getState) => {
	const { email, password } = payload;
	dispatch(authRequested());
	try {
		const data = await authService.login({ email, password });
		localStorageService.setTokens(data);
		dispatch(authRequestSuccess({ userId: data.userId }));
		const basket = getState().basket.entities;
		if (basket.length) {
			localStorage.setItem('basket', JSON.stringify(basket));
		}

		dispatch(loadCurrentUserData());
		history.push(redirect);
	} catch (error) {
		const { code, message } = error.response.data.error;
		if (code === 400) {
			const errorMessage = generateAuthError(message);
			dispatch(authRequestFailed(errorMessage));
		} else {
			dispatch(authRequestFailed(error.message));
		}
	}
};

export const signUp = (payload, redirect) => async (dispatch, getState) => {
	dispatch(authRequested());
	try {
		const data = await authService.register(payload);
		localStorageService.setTokens(data);
		dispatch(authRequestSuccess({ userId: data.userId }));
		const basket = getState().basket.entities;
		if (basket.length) {
			localStorage.setItem('basket', JSON.stringify(basket));
		}
		dispatch(loadCurrentUserData());
		history.push(redirect);
	} catch (error) {
		dispatch(authRequestFailed(error.message));
	}
};

export const logOut = () => dispatch => {
	localStorageService.removeAuthData();
	localStorage.getItem('basket') && localStorage.removeItem('basket');
	dispatch(userLoggedOut());
	history.push('/');
};

export const updateUser = payload => async dispatch => {
	dispatch(userUpdateRequested());
	try {
		const { content } = await userService.update(payload);
		dispatch(userUpdateSuccessed(content));
		history.push(`/users/${content._id}`);
	} catch (error) {
		dispatch(userUpdateFailed(error.message));
	}
};

export const addDeviceToFavorite = item => (dispatch, getState) => {
	const products = getState().user.favoritesList;
	const isAuth = getState().user.isLoggedIn;
	const productExist = products.find(product => product._id === item._id);
	if (!productExist) {
		dispatch(userFavoriteDeviceAdded({ product: item, isAuth }));
		openNotification({type: 'success', message: 'product added to favorite!'});
	}
};

export const removeDeviceFromFavorite = id => (dispatch, getState) => {
	const isAuth = getState().user.isLoggedIn;
	dispatch(userFavoriteDeviceDeleted({ id, isAuth }));
	openNotification({type: 'success', message: 'product removed from cart!'});
};

export const getCurrentUserData = () => state => state.user.entities;

export const getUserIsLoggedIn = () => state => state.user.isLoggedIn;
// export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getUsersLoadingStatus = () => state => state.user.isLoading;
export const getCurrentUserId = () => state => state.user.auth?.userId;
export const getAuthErrors = () => state => state.user.error;
export const getFavoriteProduct = id => state => state.user.favoritesList?.find(p => p._id === id);
export const getFavoriteCount = () => state => state.user.favoritesList.length;
export const getFavoriteProducts = () => state => state.user.favoritesList;
export default userReducer;

import devicesReducer from './devices';
import categoriesReducer from './categories';
import brandsReducer from './brands';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from './users';
import userReducer from './user';
import basketReducer from './basket';
import searchReducer from './search';
import adminReducer from './admin';

const rootReducer = combineReducers({
	devices: devicesReducer,
    categories: categoriesReducer,
    brands: brandsReducer,
    users: usersReducer,
    user: userReducer,
    basket: basketReducer,
    search: searchReducer,
    admin: adminReducer
	// comments: ,
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}

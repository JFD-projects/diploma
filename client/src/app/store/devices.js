import { createAction, createSlice } from '@reduxjs/toolkit';
import deviceService from './../services/device.service';
import brandService from './../services/brand.service';
import history from "../utils/history";
import { openNotification } from '../components/common/notification';

const initialState = {
	entities: [],
	isLoading: false,
	filters: {},
	error: null
	// selectedBrands: [],
	// prices: {
	// 	min: 2,
	// 	max: 80000,
	// },
	// sort: false,
};

const devicesSlice = createSlice({
	name: 'devices',
	initialState,
	reducers: {
		devicesRequest: state => {
			state.isLoading = true;
		},
		devicesReceived: (state, action) => {
			state.entities = action.payload;
			state.isLoading = false;
		},
		devicesRequestFailed: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		devicesBrandFilterSet: (state, action) => {
			state.filters.selectedBrands = action.payload;
		},
		devicesPricesChanged: (state, action) => {
			state.filters.prices = action.payload;
		},
		deviceCreated: (state, action) => {
			state.entities.push(action.payload);
		},
		// devicesSortSet: (state, action) => {
		// 	state.filters.sort = action.payload;
		// },
		devicesFiltersReset: state => {
			state.filters = []
		},
		deviceRemoved: (state, action) => {
			state.entities = state.entities.filter(
                (device) => device._id !== action.payload
            );
		},
		deviceUpdateSuccessed: (state, action) => {
            state.entities[
                state.entities.findIndex((d) => d._id === action.payload._id)
            ] = action.payload;
        },
		devicesSortFilterSet: (state, action) => {
			state.filters.sort = action.payload;
		},
		devicesFilterSet: (state, action) => {
			state.filters[action.payload.name] = action.payload.value;
		}
	},
});

const { actions, reducer: devicesReducer } = devicesSlice;
const { 
	devicesRequest, 
	devicesReceived, 
	devicesFilterSet,
	devicesFiltersReset, 
	deviceUpdateSuccessed, deviceRemoved, devicesBrandFilterSet, devicesSortFilterSet, devicesPricesChanged, devicesRequestFailed, deviceCreated } = actions;

const deviceCreateRequest = createAction('devices/deviceCreateRequest');
const deviceCreateRequestFailed = createAction('devices/deviceCreateRequestFailed');
const deviceRemoveRequest = createAction('devices/deviceRemoveRequest');
const deviceRemoveRequestedFailed = createAction('devices/deviceRemoveRequestedFailed');

const deviceUpdateFailed = createAction("devices/deviceUpdateFailed");
const deviceUpdateRequested = createAction("devices/deviceUpdateRequested");

export const loadDevicesLit = (orderBy, equalTo) => async dispatch => {
	dispatch(devicesRequest());
	try {
		const data = await deviceService.fetchAll(orderBy, equalTo);
		dispatch(devicesReceived(data));
	} catch (error) {
		dispatch(devicesRequestFailed());
	}
};

export const updateDevice = (payload) => async (dispatch) => {
    dispatch(deviceUpdateRequested());
    try {
        const data = await deviceService.update(payload);
        dispatch(deviceUpdateSuccessed(data));
        history.push(`/device`);
		openNotification({type: 'success', message:`${data.name} обновлен!`});
    } catch (error) {
        dispatch(deviceUpdateFailed(error.message));
    }
};

export const createDevice = payload => async dispatch => {
	dispatch(deviceCreateRequest());
	try {
		const data = await deviceService.post(payload);
		dispatch(deviceCreated(data));
		openNotification({type: 'success', message:`${data.name} добавлен!`});
	} catch (error) {
		dispatch(deviceCreateRequestFailed());
	}
};

export const removeDevice = id => async dispatch => {
	dispatch(deviceRemoveRequest());
	try {
		const data = await deviceService.removeDevice(id);
        if (!data) {
            dispatch(deviceRemoved(id));
        }
	} catch (error) {
		dispatch(deviceRemoveRequestedFailed());
	}
}



export const getDeviceById = id => state => {
	if (state.devices.entities) {
		return state.devices.entities.find(device => device._id === id);
	}
};

export const setFilter = filter => dispatch => dispatch(devicesFilterSet(filter));

export const setPriceFilter = range => dispatch => dispatch(devicesPricesChanged(range));
export const setSortFilter = param => dispatch => dispatch(devicesSortFilterSet(param));
export const setBrandFilter = filter => dispatch => dispatch(devicesBrandFilterSet(filter));
// export const setCategoryFilter = filter => dispatch => dispatch(devicesCategoryFilterSet(filter))
export const resetFilters = () => dispatch => dispatch(devicesFiltersReset());


export const getDevices = () => state => state.devices.entities;
export const getDevicesLoadingStatus = () => state => state.devices.isLoading;

//filters
export const getSortFilter =
	() =>
	({ devices }) =>
		devices.filters.sort;
export const getSelectedBrands =
	() =>
	({ devices }) =>
		devices.filters.selectedBrands;
export const getFilterPrices =
	() =>
	({ devices }) =>
		devices.filters.prices;

export const getFilteredDevices =
	() =>
	({
		devices: {
			entities,
			filters: { sort = null, brand = [], category =[], price = {},  },
		},
	}) => {
		let newDevices = entities;
		if (brand?.length) {
			newDevices = brand.map(brand => newDevices.filter(d => d.brand === brand)).flat();
		}
		if (category?.length) {
			newDevices = category.map(categ => newDevices.filter(d => d.category === categ)).flat();
		}
		if (sort) {
			newDevices = newDevices.slice().sort((a, b) => (sort === 'asc' ? a.price - b.price : b.price - a.price));
		}
		if (price) {
			newDevices = newDevices.filter(device => device.price >= price.min && device.price <= price.max);
		}
		return newDevices;
	};
export const getFilter = () => ({devices}) => devices.filters
export default devicesReducer;

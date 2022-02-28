
import brandService from './../services/brand.service';
import { openNotification } from '../components/common/notification';

const { createSlice, createAction } = require("@reduxjs/toolkit");

const initialState = {
	entities: [],
	isLoading: false
};

const brandsSlice = createSlice({
	name: 'brands',
	initialState,
	reducers: {
		brandsRequested: (state) => {
            state.isLoading = true;
        },
        brandsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        brandsRequestFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
		brandCreated: (state, action) => {
			state.entities.push(action.payload);
		},
	}
});

const {actions, reducer: brandsReducer} = brandsSlice;
const {brandsRequested, brandsReceived, brandsRequestFailed, brandCreated} = actions;

const brandCreateRequestFailed = createAction("brands/brandCreateFailed");
const brandCreateRequested = createAction("brands/brandCreateRequested");

export const loadBrandsList = () => async (dispatch) => {
	dispatch(brandsRequested());
	try {
		const data = await brandService.fetchAll();
		dispatch(brandsReceived(data));
	} catch (error) {
		dispatch(brandsRequestFailed(error.message));
	}
}

export const createBrand = payload => async dispatch => {
	dispatch(brandCreateRequested());
	try {
		const data = await brandService.post(payload);
		dispatch(brandCreated(data));
		openNotification({type: 'success', message:`${data.name} добавлен!`});
	} catch (error) {
		dispatch(brandCreateRequestFailed());
	}
};

export const getBrands = () => state => state.brands.entities;
export const getBrandById = (id) => state => {
	state.brands.entities.find(brand => brand._id === id)}
export default brandsReducer;
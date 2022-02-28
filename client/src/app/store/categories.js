
import categoryService from './../services/category.service';
import { openNotification } from '../components/common/notification';

const { createSlice, createAction } = require("@reduxjs/toolkit");

const initialState = {
	entities: [],
	isLoading: false
};

const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		categoriesRequested: (state) => {
            state.isLoading = true;
        },
        categoriesReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        categoriesRequestFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
		categoryCreated: (state, action) => {
			state.entities.push(action.payload);
		},
	}
});

const {actions, reducer: categoriesReducer} = categoriesSlice;
const {categoriesRequested, categoriesReceived, categoryCreated, categoriesRequestFailed} = actions;

const categoryCreateRequested= createAction('categories/categoryCreateRequested')
const categoryCreateRequestFailed= createAction('categories/categoryCreateRequestFailed')

export const loadCategoriesList = () => async (dispatch) => {
	dispatch(categoriesRequested());
	try {
		const data = await categoryService.fetchAll();
		dispatch(categoriesReceived(data));
	} catch (error) {
		dispatch(categoriesRequestFailed(error.message));
	}
}

export const createCategory = payload => async dispatch => {
	dispatch(categoryCreateRequested());
	try {
		const data = await categoryService.post(payload);
		dispatch(categoryCreated(data));
		openNotification({type: 'success', message:`${data.name} добавлен!`});
	} catch (error) {
		dispatch(categoryCreateRequestFailed());
	}
};

export const getCategories =() => state => state.categories.entities;
export const getCategoriesLoadingStatus = () => state => state.categories.isLoading;

export const getCategory = (category) => (state) => {
    if (state.categories.entities) {
        return state.categories.entities.find((c) => c.identifier === category);
    }
};

export const getCategoryById = id => state => state.categories.entities.find((c) => c._id === id);

export default categoriesReducer;
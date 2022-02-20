
import searchService from './../services/search.service';
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
	entities: [],
	isLoading: false
};

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		searchRequested: (state) => {
            state.isLoading = true;
        },
        searchReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        searchRequestFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
	}
});

const {actions, reducer: searchReducer} = searchSlice;
const {searchRequested, searchReceived, searchRequestFailed} = actions;

export const loadSearchList = (query) => async (dispatch) => {
	dispatch(searchRequested());
	try {
		if(query.length){
			const data = await searchService.fetchAll(query);
			dispatch(searchReceived(data));
		} else {
			dispatch(searchReceived([]));
		}
		
	} catch (error) {
		dispatch(searchRequestFailed(error.message));
	}
}

export const getSearchResults =() => state => state.search.entities;
export const getSearchLoadingStatus = () => state => state.categories.isLoading;

export default searchReducer;
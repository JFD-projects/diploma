import { openNotification } from '../components/common/notification';
import history from '../utils/history';

const { createSlice } = require("@reduxjs/toolkit");

const basketItems = (localStorage.getItem("basket") && JSON.parse(localStorage.getItem("basket"))) || []

const initialState = {
	entities: basketItems,
};

const basketSlice = createSlice({
	name: 'basket',
	initialState,
	reducers: {
		basketProductAdded: (state, action) => {
            state.entities.push({...action.payload.product, amount: 1});
			action.payload.isAuth && localStorage.setItem("basket", JSON.stringify(state.entities))
        },
        basketProductDeleted: (state, action) => {
            state.entities = state.entities.filter(p => p._id !== action.payload.id)
			action.payload.isAuth && localStorage.setItem("basket", JSON.stringify(state.entities))
        },
		basketCleaned: (state, action) => {
			state.entities = []
			action.payload.isAuth && localStorage.removeItem("basket")
		},
		amountChanged: (state, action) => {
			state.entities = state.entities.map(p => {
				if(p._id === action.payload.product._id){
					return action.payload.product
				}
				return p
			})
			action.payload.isAuth && localStorage.setItem("basket", JSON.stringify(state.entities))
		}
	}
});

const {actions, reducer: basketReducer} = basketSlice;
const { basketProductAdded, basketProductDeleted, basketCleaned, amountChanged} = actions;

export const addToBasket = (item) => (dispatch, getState) => {
	const products = getState().basket.entities;
	const isAuth = getState().user.isLoggedIn;
	const productExist = products.find(product => product._id === item._id )
	if(!productExist){
		dispatch(basketProductAdded({product: item, isAuth}));
		openNotification({type: 'success', message:"product added to cart!"})
	}
}

export const changeProductAmount = (product) => (dispatch, getState) => {
	const isAuth = getState().user.isLoggedIn;
	dispatch(amountChanged({product, isAuth}))
}

export const removeFromBasket = (id) => (dispatch, getState) => {
	const isAuth = getState().user.isLoggedIn;
	dispatch(basketProductDeleted({id, isAuth}));
	openNotification({type: 'success', message:"product removed from cart!"});
}

export const clearBasket = () => (dispatch, getState) => {
	const isAuth = getState().user.isLoggedIn;
	dispatch(basketCleaned({isAuth}));
}

export const sendToOrders = ({data, redirect}) => (dispatch, getState) => {
	openNotification({type: 'success', message: 'thank you for order!'});
	const isAuth = getState().user.isLoggedIn;
	dispatch(basketCleaned({isAuth}));
	history.push(redirect);
}

export const getBasketProducts = () => state => state.basket.entities;
export const getProductInBasket = (id) => state => state.basket.entities.find(p => p._id === id);
export const getProductsCountInBasket = () => state => state.basket.entities.reduce((prev,curr) => prev + curr.amount, 0)

export default basketReducer;
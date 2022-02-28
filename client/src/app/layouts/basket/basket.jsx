import React from 'react';
import { Layout } from 'antd';
import { useSelector } from 'react-redux';

import "./basket.sass";
import { getBasketProducts } from '../../store/basket';
import BasketPage from '../../components/page/basketPage/basketPage';

const {Content} = Layout;

const Basket = () => {
	const products = useSelector(getBasketProducts());

	if (products.length) {
		return <BasketPage />;
	}
	return (
		<Content className='basket-content'>
			<h2>Shopping cart is empty</h2>
		</Content>
	);
};

export default Basket;

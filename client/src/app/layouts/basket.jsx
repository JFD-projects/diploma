import React from 'react';
import { Layout } from 'antd';
import { useSelector } from 'react-redux';
import { getBasketProducts } from './../store/basket';
import BasketPage from '../components/page/basketPage/basketPage';

const Basket = () => {
	const products = useSelector(getBasketProducts());

	if (products.length) {
		return <BasketPage />;
	}
	return (
		<Layout style={{height: '90vh'}} className='p-4'>
			<h2>Shopping cart is empty</h2>
		</Layout>
	);
};

export default Basket;

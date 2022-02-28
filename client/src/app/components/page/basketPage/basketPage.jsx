import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsCountInBasket, getBasketProducts, clearBasket, removeFromBasket } from './../../../store/basket';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Layout, Row, Col } from 'antd';

import BasketProductCard from '../../ui/basket/basketProductCard';
import BasketInfo from '../../ui/basket/basketInfo';
import BasketForm from '../../ui/basket/basketForm';
import { sendToOrders } from '../../../store/basket';
import { useHistory } from 'react-router-dom';

const {Content} = Layout;

const BasketPage = () => {
	const history = useHistory();
	const products = useSelector(getBasketProducts());
	const dispatch = useDispatch();
	const productsCount = useSelector(getProductsCountInBasket());

	const getProductsPrice = () => {
		return products.reduce((el, acc) => el + acc.price, 0);
	};

	const handleSubmit = (data) => {
		const newData = {
			...data,
			products,
			price: getProductsPrice()
		}
		const redirect = history.location.state ? history.location.state.from.pathname : '/';
		dispatch(sendToOrders({data: newData, redirect}));
	};

	return (
		<Content className='basket-content'>
			<h1 className='flex-grow-1'>Корзина</h1>
			<p className='flex-grow-1 text-end align-self-end active-link' onClick={() => dispatch(clearBasket())}>
				Очистить Корзину <AiOutlineShoppingCart />
			</p>
			<Row className='basket-container'>
				<Col md={14} lg={14} className='basket-container__products'>
					{products.map(product => (
						<BasketProductCard key={product._id} product={product} />
					))}
				</Col>
				<Col className='basket-container__pay' md={10} lg={10}>
					<BasketInfo productsCount={productsCount} getProductsPrice={getProductsPrice}/>
					<BasketForm onSubmit={handleSubmit}/>
				</Col>
			</Row>
		</Content>
	);
};

export default BasketPage;

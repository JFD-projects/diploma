import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsCountInBasket, getBasketProducts, clearBasket, removeFromBasket } from './../../../store/basket';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Layout, Row, Col } from 'antd';
import BasketProductCard from '../../ui/basket/basketProductCard';
import BasketInfo from '../../ui/basket/basketInfo';
import BasketForm from '../../ui/basket/basketForm';

const BasketPage = () => {
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
	};

	return (
		<Layout className='d-flex flex-wrap p-4'>
			<h1 className='flex-grow-1'>Корзина</h1>
			<p className='flex-grow-1 text-end align-self-end active-link' onClick={() => dispatch(clearBasket())}>
				Очистить Корзину <AiOutlineShoppingCart />
			</p>
			<Row className='flex-grow-0 flex-shrink-0 w-100 mt-3'>
				<Col md={14} lg={14} className='basket-container'>
					{products.map(product => (
						<BasketProductCard key={product._id} product={product} />
					))}
				</Col>
				<Col className='basket-pay' md={10} lg={10}>
					<BasketInfo productsCount={productsCount} getProductsPrice={getProductsPrice}/>
					<BasketForm onSubmit={handleSubmit}/>
				</Col>
			</Row>
		</Layout>
	);
};

export default BasketPage;

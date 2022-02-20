import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Row, Col } from 'antd';
import Counter from '../../common/counter';
import { useDispatch } from 'react-redux';
import { removeFromBasket } from './../../../store/basket';

const BasketProductCard = ({ product }) => {
	const dispatch = useDispatch();
	return (
		<Row className='p-3 mb-3 text-main basket-card'>
			<Col md={8} lg={8}>
				<img className='w-100 basket-img' src={product.image} alt={product.name} />
			</Col>
			<Col md={16} lg={16}>
				<Row>
					<Col>{product.name}</Col>
					<Col>
						<Counter available={product.available} product={product} count={product.amount} />
					</Col>
					<Col>{product.price}</Col>
				</Row>
				<Row className='text-end'>
					<p className='active-link' onClick={() => dispatch(removeFromBasket(product._id))}>
						Удалить <AiOutlineShoppingCart />
					</p>
				</Row>
			</Col>
		</Row>
	);
};

export default BasketProductCard;

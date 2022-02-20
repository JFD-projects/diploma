import React from 'react';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { changeProductAmount } from '../../store/basket';

const Counter = ({available, count, product}) => {
	const dispatch = useDispatch();
	const inc = () => {
		if(count < available){
			const newProduct = {...product, amount: count+1,  price: (count+1) * product.price}
			dispatch(changeProductAmount(newProduct))
		}
		
	};

	const dec = () => {
		if (count > 1) {
			const newProduct = {...product, amount: count-1,  price: product.price / count}
			dispatch(changeProductAmount(newProduct))
		}
	};
	return (
		<div className='d-flex '>
			<Button className='btn-default' onClick={dec}>
				-
			</Button>
			<p className='m-auto'>{count}</p>
			<Button className='btn-default' onClick={inc}>
				+
			</Button>
		</div>
	);
};

export default Counter;

import React from 'react';

const BasketInfo = ({productsCount, getProductsPrice}) => {
	return (
		<>
			<div className='d-flex justify-content-between'>
				<p>Итого</p>
				<p>{productsCount === 1 ? `${productsCount} товар` : `${productsCount} товара`}</p>
			</div>
			<div className='d-flex justify-content-between'>
				<p>Количество:</p>
				<p>{productsCount} шт.</p>
			</div>
			<div className='d-flex justify-content-between'>
				<h5>Стоимость:</h5>
				<h5>{getProductsPrice()}</h5>
			</div>
		</>
	);
};

export default BasketInfo;

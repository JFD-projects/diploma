import React from 'react';
import { useDispatch } from 'react-redux';
import { Rate, Image, Badge, Row, Col, Layout, Button } from 'antd';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineHeart, AiOutlineShoppingCart, AiOutlineCheck, AiFillHeart } from 'react-icons/ai';

import { getDeviceById } from '../../../store/devices';
import { addToBasket, getProductInBasket, removeFromBasket } from '../../../store/basket';
import { addDeviceToFavorite, getFavoriteProduct } from '../../../store/user';
import { removeDeviceFromFavorite } from '../../../store/user';

const DeviceCard = () => {
	const { deviceId } = useParams();
	const dispatch = useDispatch();
	const device = useSelector(getDeviceById(deviceId));
	const productInCart = (useSelector(getProductInBasket(deviceId)) && true) || false;
	const isFavorite = (useSelector(getFavoriteProduct(deviceId)) && true) || false;

	const addToCart = product => {
		dispatch(addToBasket(product));
	};

	const removeFromCart = id => {
		dispatch(removeFromBasket(id));
	};

	const addToFavorite = product => {
		dispatch(addDeviceToFavorite(product));
	};

	const removeFromFavorite = id => {
		dispatch(removeDeviceFromFavorite(id));
	};
	if (device) {
		return (
			<Layout className='pt-3'>
				<Row gutter={[16, 16]}>
					<Col span={10}>
						{device.new ? (
							<Badge.Ribbon color='green' text={<p className='device-new'>Новинка</p>}>
								<Image className='w-100' src={device.image} />
							</Badge.Ribbon>
						) : (
							<Image className='w-100' src={device.image} />
						)}
					</Col>
					<Col span={14}>
						<h1 className='text-main'>{device.name}</h1>
						<Row gutter={[16, 16]}>
							<Col span={10}>
								<p className='text-main'>Оценка покупателей:</p>
								<h2 className="text-green">{device.price} руб.</h2>
								
							</Col>
							<Col span={12}>
								<Rate allowHalf defaultValue={device.rate} />
								<div className='d-flex flex-wrap mt-3'>
									<Button className='flex-grow-0 flex-shrink-0 w-100 mb-3 btn-active'>Купить</Button>
									<Button className='flex-grow-1 me-2 btn-default' onClick={() => (!isFavorite ? addToFavorite(device) : removeFromFavorite(device._id))}>
										{isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
									</Button>
									<Button className='flex-grow-1 btn-default' onClick={() => (!productInCart ? addToCart(device) : removeFromCart(device._id))}>
										{productInCart ? <AiOutlineCheck /> : <AiOutlineShoppingCart />}
									</Button>
								</div>
							</Col>
						</Row>
					</Col>
				</Row>
			</Layout>
		);
	}
	return <h1>Loading</h1>;
};

export default DeviceCard;

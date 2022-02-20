import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Card, Image, Badge } from 'antd';
import { AiOutlineHeart, AiOutlineShoppingCart, AiFillDelete, AiFillHeart, AiOutlineSetting } from 'react-icons/ai';
import { BsFillCartCheckFill } from 'react-icons/bs';

import { getCategoryById } from '../../store/categories';
import { removeFromBasket, addToBasket, getProductInBasket } from './../../store/basket';
import { addDeviceToFavorite, getFavoriteProduct, removeDeviceFromFavorite } from '../../store/user';
import { getIsAdminLoggedIn } from '../../store/admin';
import { DEVICE_ROUTE } from '../../utils/routeConsts';
import { removeDevice } from '../../store/devices';

const DeviceItem = ({ device }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const category = useSelector(getCategoryById(device.category));
	const productInCart = (useSelector(getProductInBasket(device._id)) && true) || false;
	const isFavorite = (useSelector(getFavoriteProduct(device._id)) && true) || false;

	const isAdminAuth = useSelector(getIsAdminLoggedIn());

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
	return (
		<Col span={6}>
			<Card className='device-card'>
				<Col>
					{device.new ? (
						<Badge.Ribbon color='green' text={<p className='device-new'>Новинка</p>}>
							<Image src={device.image} className='w-100 card-img' alt={device.name} />
						</Badge.Ribbon>
					) : (
						<Image src={device.image} className='w-100 card-img' alt={device.name} />
					)}

					{isAdminAuth ? (
						<div className='d-flex justify-content-between text-green'>
							<p className='active-link me-3' onClick={() => history.push(DEVICE_ROUTE + '/' + device._id)}>
								<AiOutlineSetting />
							</p>
							<p className='active-link me-3' onClick={() => dispatch(removeDevice(device._id))}>
								<AiFillDelete />
							</p>
						</div>
					) : (
						<div className='d-flex justify-content-end text-green'>
							<p className='active-link me-3' onClick={() => (!isFavorite ? addToFavorite(device) : removeFromFavorite(device._id))}>
								{isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
							</p>
							<p className='active-link' onClick={() => (!productInCart ? addToCart(device) : removeFromCart(device._id))}>
								{productInCart ? <BsFillCartCheckFill /> : <AiOutlineShoppingCart />}
							</p>
						</div>
					)}
				</Col>
				<Col onClick={() => !isAdminAuth && history.push(DEVICE_ROUTE + `/${category.identifier}/` + device._id)}>
					<h5 className='title-small'>{device.name}</h5>
					<p className='text-green fw-bold'>{device.price} руб.</p>
				</Col>
			</Card>
		</Col>
	);
};

export default DeviceItem;

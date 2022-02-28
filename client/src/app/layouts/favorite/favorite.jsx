import React from 'react';
import { Layout, Row } from 'antd';
import { useSelector } from 'react-redux';
import DeviceItem from '../../components/ui/device/deviceItem';
import './favorite.sass'
import { getFavoriteProducts } from '../../store/user';

const { Content } = Layout;

const Favorite = () => {
	const favoriteListItems = useSelector(getFavoriteProducts());

	if (favoriteListItems.length) {
		return (
			<Content className='favorite-content'>
				<Row gutter={[16, 16]}>{favoriteListItems.length && favoriteListItems.map(device => <DeviceItem key={device._id} device={device} />)}</Row>{' '}
			</Content>
		);
	}
	return (
		<Content className='favorite-content'>
			<h2>List empty</h2>
		</Content>
	);
};

export default Favorite;

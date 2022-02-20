import React from 'react';
import { Layout, Row } from 'antd';
import { useSelector } from 'react-redux';
import DeviceItem from '../components/ui/deviceItem';
import { getFavoriteProducts } from '../store/user';

const Favorite = () => {
	const favoriteListItems = useSelector(getFavoriteProducts());

	return (
		<Layout className='p-3'>
			<Row gutter={[16, 16]}>{favoriteListItems.length && favoriteListItems.map(device => <DeviceItem key={device._id} device={device} />)}</Row>
			{!favoriteListItems.length && <h5>List empty</h5>}
		</Layout>
	);
};

export default Favorite;

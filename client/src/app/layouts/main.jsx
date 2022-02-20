import React, { useEffect } from 'react';
import { Layout, Row } from 'antd';
import { useDispatch } from 'react-redux';
import { loadBrandsList } from './../store/brands';
import { loadCategoriesList } from './../store/categories';

const Main = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		console.log('main page loaded')
	}, [])
	return ( 
		<Layout className='px-5'>
			<Row>
				main page
			</Row>
		</Layout>
	  );
}
 
export default Main;
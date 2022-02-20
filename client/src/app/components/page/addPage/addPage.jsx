import React from 'react';
import { Tabs } from 'antd';
import DevicePageAdd from './../devicePage/devicePageAdd';
import AddBrands from './../../ui/admin/addBrands';
import AddCategory from './../../ui/admin/addCategory';

const { TabPane } = Tabs;
const AddPage = () => {
	return (
		<Tabs type='card'>
			<TabPane tab='Добавить товар' key='1'>
				<DevicePageAdd />
			</TabPane>
			<TabPane tab='Добавить бренд' key='2'>
				<AddBrands />
			</TabPane>
			<TabPane tab='Добавить категорию' key='3'>
				<AddCategory />
			</TabPane>
		</Tabs>
	);
};

export default AddPage;

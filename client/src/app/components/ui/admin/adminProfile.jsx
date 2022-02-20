import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { BiLogOut } from 'react-icons/bi';
import { AiOutlineFileAdd, AiOutlineUnorderedList } from 'react-icons/ai';
import { BsFillBasket3Fill } from 'react-icons/bs';

import { getCurrentAdminData } from '../../../store/admin';
import Logo from '../../../assets/devicestore.svg';
import SearchDevices from '../../common/search';
import UserProfileInformation from '../user/userProfileInformation';
import AddPage from '../../page/addPage/addPage';
import Devices from './../../../layouts/devices';

const { Content, Sider } = Layout;

const AdminProfile = () => {
	const [activeTab, setActiveTab] = useState('profile');
	const admin = useSelector(getCurrentAdminData());
	const handleMenuClick = ({ key }) => setActiveTab(key);

	return (
		<Layout style={{height: '100vh', overflow: 'hidden'}}>
			<Sider>
				<Link to={'/'} className='logo'>
					<img className='p-2' src={Logo} alt='devicestore' />
					<p className='text-logo'>интернет магазин девайсов</p>
				</Link>
				<Menu theme='dark' mode='inline' defaultSelectedKeys={[activeTab]}>
					<Menu.Item key='0'>
						<SearchDevices />
					</Menu.Item>
					<Menu.Item key='profile' onClick={handleMenuClick} icon={<img className='admin-img' src={admin.image} alt={admin.name} />}>
						Профиль
					</Menu.Item>
					<Menu.Item key='catalog' onClick={handleMenuClick} icon={<AiOutlineUnorderedList />}>
						Каталог
					</Menu.Item>
					<Menu.Item key='add' onClick={handleMenuClick} icon={<AiOutlineFileAdd />}>
						Добавить
					</Menu.Item>
					<Menu.Item key='orders' onClick={handleMenuClick} icon={<BsFillBasket3Fill />}>
						Заказы
					</Menu.Item>
					<Menu.Item key='5' icon={<BiLogOut />}>
						<Link to='/logout'>LogOut</Link>
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout className='site-layout'>
				<Content
					className='site-layout-background'
					style={{
						margin: '24px 16px',
						padding: 24,
						minHeight: '60vh',
					}}>
					{activeTab === 'profile' ? <UserProfileInformation user={admin} /> : activeTab === 'catalog' ? <Devices /> : activeTab === 'orders' ? <p>Will be added soon...</p> : <AddPage />}
				</Content>
			</Layout>
		</Layout>
	);
};

export default AdminProfile;

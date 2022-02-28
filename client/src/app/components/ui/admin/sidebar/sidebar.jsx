import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import SearchDevices from '../../../common/search';
import { ADD_ROUTE, ORDERS_ROUTE, PROFILE_ROUTE, CATALOG_ROUTE } from '../../../../utils/routeConsts';
import { AiOutlineFileAdd, AiOutlineUnorderedList } from 'react-icons/ai';
import { BsFillBasket3Fill } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import Logo from '../../../../assets/devicestore.svg';
import { useSelector } from 'react-redux';
import { getCurrentAdminData } from '../../../../store/admin';
import history from '../../../../utils/history';
const { Sider } = Layout;

const SideBar = () => {
	const { location } = history;
	const admin = useSelector(getCurrentAdminData());

	const handleMenuClick = ({ key }) => history.push(key === 'profile' ? '/' : `/${key}`);
	return (
		<Sider>
			<Link to={'/'} className='logo'>
				<img className='p-2' src={Logo} alt='devicestore' />
				<p className='text-logo'>интернет магазин девайсов</p>
			</Link>

			<Menu theme='dark' mode='inline' defaultSelectedKeys={[location.pathname.slice(1).length ? location.pathname.slice(1) : 'profile']}>
				<Menu.Item key='0'>
					<SearchDevices />
				</Menu.Item>
				<Menu.Item key='profile' onClick={handleMenuClick} icon={<img className='admin-img' src={admin?.image} alt={admin?.name} />}>
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
	);
};

export default SideBar;

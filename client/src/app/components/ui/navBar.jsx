import React from 'react';
import { Layout, Menu, Dropdown, Badge } from 'antd';
import { Link } from 'react-router-dom';
import SearchDevices from '../common/search';
import { DEVICE_ROUTE, SHOP_ROUTE, LOGIN_ROUTE, FAVORITE_ROUTE } from '../../utils/routeConsts';
import { AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { getUserIsLoggedIn, getCurrentUserId } from '../../store/user';
import Logo from '../../assets/devicestore.svg';
import { getCategories } from '../../store/categories';
import { BASKET_ROUTE } from './../../utils/routeConsts';
import { getProductsCountInBasket } from './../../store/basket';
import { AiOutlineDown, AiOutlineHeart } from 'react-icons/ai';
import { getFavoriteCount } from './../../store/user';
// DownOutlined
const { Header } = Layout;
const NavBar = () => {
	const isUserAuth = useSelector(getUserIsLoggedIn());
	const currentUserId = useSelector(getCurrentUserId());
	const categories = useSelector(getCategories());
	const basketCount = useSelector(getProductsCountInBasket());
	const favoriteCount = useSelector(getFavoriteCount());

	return (
		<Header className='bg-light'>
			<Menu className='bg-light h-100 al-center' mode='horizontal'>
				<Menu.Item key='0'>
					<Link to={SHOP_ROUTE} className='logo h-100'>
						<img src={Logo} alt='devicestore' />
						<p className='text-logo'>интернет магазин девайсов</p>
					</Link>
				</Menu.Item>

				<Menu.Item key='1' className='navbar-search'>
					<div className='d-flex flex-column h-100 justify-content-center pt-2'>
						<SearchDevices />
						<div className='lh-1'>
							{categories.map((category, index) => (
								<>
									{index <= 4 && (
										<p key={category._id} className='navbar-category'>
											<Link className='navbar-category__link' to={`/device/${category.identifier}`}>
												{category.name}
											</Link>
										</p>
									)}
								</>
							))}
							<Link className='navbar-category__link' to={DEVICE_ROUTE}>Все</Link>
						</div>
					</div>
				</Menu.Item>

				<Menu.Item key='2' className='navbar-catalog'>
					<Dropdown
						overlay={
							<Menu>
								{categories.map(category => (
									<Link key={category._id} className='text-decoration-none' to={`/device/${category.identifier}`}>
										<Menu.Item key={category._id}>{category.name}</Menu.Item>
									</Link>
								))}
							</Menu>
						}
						trigger={['click']}>
						<p className='navbar-category__link ant-dropdown-link'  onClick={e => e.preventDefault()}>
							Каталог <AiOutlineDown />
						</p>
					</Dropdown>
				</Menu.Item>

				<Menu.Item key='3' className='ms-auto px-1'>
					{isUserAuth ? (
						<Dropdown
							overlay={
								<Menu>
									<Menu.Item key='0'>
										<Link to={`/user/${currentUserId}`}>Profile</Link>
									</Menu.Item>
									<Menu.Item key='1'>
										<Link to='/logout'>LogOut</Link>
									</Menu.Item>
								</Menu>
							}>
							<a className='ant-dropdown-link' onClick={e => e.preventDefault()}>
								<AiOutlineUser className='cart-icon' /> <AiOutlineDown />
							</a>
						</Dropdown>
					) : (
						<Link to={LOGIN_ROUTE}>
							<AiOutlineUser className='cart-icon'/>
						</Link>
					)}
				</Menu.Item>

				<Menu.Item key='4' className="px-2">
					<Link to={FAVORITE_ROUTE}>
						{favoriteCount ? (
							<Badge count={favoriteCount} bg='green'>
								<AiOutlineHeart className='cart-icon' />
							</Badge>
						) : (
							<AiOutlineHeart className='cart-icon' />
						)}
					</Link>
				</Menu.Item>

				<Menu.Item key='5' className="px-1">
					<Link to={BASKET_ROUTE}>
						{basketCount ? (
							<Badge count={basketCount} bg='green'>
								<AiOutlineShoppingCart className='cart-icon' />
							</Badge>
						) : (
							<AiOutlineShoppingCart className='cart-icon' />
						)}
					</Link>
				</Menu.Item>
			</Menu>
		</Header>
	);
};

export default NavBar;

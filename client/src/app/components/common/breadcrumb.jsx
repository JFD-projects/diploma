import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SHOP_ROUTE } from '../../utils/routeConsts';
import { AiOutlineHome } from 'react-icons/fa';
const Breadcrumbs = () => {
	return (
		<Breadcrumb>
			<Breadcrumb.Item>
				<Link to={SHOP_ROUTE}>
					<AiOutlineHome />
				</Link>
			</Breadcrumb.Item>
		</Breadcrumb>
	);
};

export default Breadcrumb;

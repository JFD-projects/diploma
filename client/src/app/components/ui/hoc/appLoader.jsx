import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategoriesList, getCategoriesLoadingStatus } from '../../../store/categories';
import { Spin } from 'antd';
import { getUserIsLoggedIn } from '../../../store/user';
import { loadCurrentUserData } from './../../../store/user';
import { loadBrandsList } from './../../../store/brands';
import { currentAdminData, getIsAdminLoggedIn } from '../../../store/admin';

const AppLoader = ({ children }) => {
	const dispatch = useDispatch();
	const isAdminAuth = useSelector(getIsAdminLoggedIn());
	const isUserAuth = useSelector(getUserIsLoggedIn());

	const isCategoriesLoaded = useSelector(getCategoriesLoadingStatus());

	useEffect(() => {
		dispatch(loadCategoriesList());
		dispatch(loadBrandsList());
		console.log(isAdminAuth)
		if (isUserAuth) {
			dispatch(loadCurrentUserData());
		} else if(isAdminAuth) {
			console.log(isAdminAuth)
			dispatch(currentAdminData());
		}
	}, []);

	if (isCategoriesLoaded) {
		return <Spin size='large' />;
	}
	return children;
};
// AppLoader.propTypes = {
// 	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
// };
export default AppLoader;

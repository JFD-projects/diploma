import axios from 'axios';
import configFile from '../../config.json';
import authService from './auth.service';
import adminService from './admin.service';
import localStorageService from './localStorage.service';

const http = axios.create({
	baseURL: configFile.apiEndpoint,
});

http.interceptors.request.use(
	async function (config) {
		const isAdminAuth = localStorageService.getAdmin();
		const expiresDate = localStorageService.getTokenExpiresDate();
		const refreshToken = localStorageService.getRefreshToken();
		const isExpired = refreshToken && expiresDate < Date.now();
		

		if (isExpired) {
			const data = isAdminAuth ? await adminService.refresh() : await authService.refresh();
			localStorageService.setTokens(data);
		}
		const accessToken = localStorageService.getAccessToken();
		if (accessToken) {
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${accessToken}`,
			};
		}

		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

const httpService = {
	get: http.get,
	post: http.post,
	put: http.put,
	delete: http.delete,
	patch: http.patch,
};
export default httpService;

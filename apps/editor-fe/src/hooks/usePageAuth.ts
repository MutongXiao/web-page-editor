import { useLocation, Navigate } from 'react-router-dom';
import useGetUserInfo from './useGetLocaltUserInfo';
import { isLoginOrRegisterPath, isNoNeedUserInfoPath } from '@/router';
import { getToken } from '@/utils/user-token';

function usePageAuth() {
	// location 用于记录访问的页面
	const location = useLocation();
	const { routerPermissions, username } = useGetUserInfo();
	const token = getToken();

	let canAccept: boolean = false;
	if (isLoginOrRegisterPath(location.pathname)) {
		// 用户已登录，不能访问 登录 / 注册 页
		if (token && username) {
			canAccept = false;
		} else {
			canAccept = true;
		}
	} else if (isNoNeedUserInfoPath(location.pathname)) {
		// 不需要校验用户信息即可访问
		canAccept = true;
	} else {
		// 需要校验 是否登录 和 用户权限
		canAccept =
			token && routerPermissions.find((p) => location.pathname.includes(p))
				? true
				: false;
	}

	return {
		canAccept,
		location,
		Navigate
	};
}

export default usePageAuth;

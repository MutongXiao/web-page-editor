import { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { useDispatch } from 'react-redux';

import useGetUserInfo from './useGetLocaltUserInfo';
import { getUserInfoService } from '@/services/user';
import { loginReducer, logoutReducer } from '@/store/userReducer';
import { removeToken, getToken } from '@/utils/user-token';
import { message } from 'antd';

function useLoadUserData() {
	const token = getToken();
	// token 不存在，不加载用户数据，加载状态就为false
	const [waitingUserData, setWaitingUserData] = useState(token ? true : false);
	const dispatch = useDispatch();
	// ajax 加载用户信息
	const { run } = useRequest(getUserInfoService, {
		manual: true,
		onSuccess(result) {
			const { username, nickname, routerPermissions } = result.data!;
			dispatch(loginReducer({ username, nickname, routerPermissions })); // 存储到 redux store
		},
		onError(err) {
			const { errno } = (err || {}) as typeof err & { errno?: number };
			// 错误状态码被链接器抛出错误， token 失效
			if (errno === 100) {
				message.error('令牌已失效，请重新登录');
				removeToken();
				dispatch(logoutReducer());
			}
		},
		onFinally() {
			setWaitingUserData(false);
		}
	});

	// 判断当前 redux store 是否已经存在用户信息
	const { username } = useGetUserInfo();

	useEffect(() => {
		// 如果 token 不存在 或者 redux store 已经存在用户信息，就不用重新加载了
		if (!token || username) {
			setWaitingUserData(false);
			return;
		}
		// 如果 redux store 中没有用户信息，则进行加载
		run();
	}, [token, username]);

	return { waitingUserData };
}

export default useLoadUserData;

import axios from 'axios';

import { getToken } from '@/utils/user-token';

const instance = axios.create({
	timeout: 10 * 1000
});

// request 拦截：每次请求都带上 token
instance.interceptors.request.use(
	(config) => {
		config.headers['Authorization'] = `Bearer ${getToken()}`; // JWT 的固定格式
		return config;
	},
	(error) => Promise.reject(error)
);

// response 拦截：统一处理 errno 和 msg
instance.interceptors.response.use((res) => {
	const resData = res.data || {};
	const { errno, data, msg } = resData;
	// 把带错误状态码的成功响应，在 axios 层按未请求成功抛出错误响应
	if (errno !== 0) {
		return Promise.reject(resData);
	}

	return resData;
});

export default instance;

export type ResponseType<T> = {
	errno?: number;
	data?: T;
	msg?: string;
};

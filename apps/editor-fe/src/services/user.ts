import axios, { type ResponseType } from './ajax';

export type UserInfoType = {
	token?: string;
	username: string;
	nickname: string;
	routerPermissions: string[];
};

// 获取用户信息
export async function getUserInfoService(): Promise<
	ResponseType<UserInfoType>
> {
	const url = '/api/user/info';
	const data = await axios.get(url);
	return data;
}

// 注册用户
export async function registerService(
	username: string,
	password: string,
	nickname?: string
): Promise<ResponseType<null>> {
	const url = '/api/user/register';
	const body = { username, password, nickname: nickname || username };
	const data = await axios.post(url, body);
	return data;
}

// 登录
export async function loginService(
	username: string,
	password: string
): Promise<ResponseType<UserInfoType>> {
	const url = '/api/user/login';
	const body = { username, password };
	const data = await axios.post(url, body);
	return data;
}

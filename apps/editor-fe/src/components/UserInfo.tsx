import React, { FC } from 'react';
import { Button, Space, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import { LOGIN_PATHNAME, REGISTER_PATHNAME } from '@/router';
import { removeToken } from '@/utils/user-token';
import useGetUserInfo from '@/hooks/useGetLocaltUserInfo';
import { logoutReducer } from '@/store/userReducer';

const UserInfo: FC = () => {
	const nav = useNavigate();
	const dispatch = useDispatch();

	const { username, nickname } = useGetUserInfo(); // 从 redux 中获取用户信息

	function logout() {
		removeToken(); // 清除 token 的存储
		dispatch(logoutReducer()); // 清空了 redux user 数据
		message.success('退出成功');
		nav(LOGIN_PATHNAME);
	}

	const UserInfo = (
		<Space>
			<Space style={{ color: '#e8e8e8' }}>
				<UserOutlined />
				{nickname}
			</Space>
			<Button type="link" onClick={logout}>
				退出
			</Button>
		</Space>
	);

	const Login = (
		<Space>
			<Link style={{ color: '#ffffff' }} to={LOGIN_PATHNAME}>
				登录
			</Link>
			<span style={{ color: '#ffffff' }}>|</span>
			<Link style={{ color: '#ffffff' }} to={REGISTER_PATHNAME}>
				注册
			</Link>
		</Space>
	);

	return <div>{username ? UserInfo : Login}</div>;
};

export default UserInfo;

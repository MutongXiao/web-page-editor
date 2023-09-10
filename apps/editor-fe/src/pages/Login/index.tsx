import React, { FC, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
	Typography,
	Space,
	Form,
	Input,
	Button,
	Checkbox,
	message
} from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useRequest } from 'ahooks';

import { loginReducer } from '@/store/userReducer';
import { REGISTER_PATHNAME, MANAGE_PATHNAME, LOGIN_PATHNAME } from '@/router';
import { loginService } from '@/services/user';
import { setToken } from '@/utils/user-token';
import styles from './Login.module.less';
import usePageAuth from '@/hooks/usePageAuth';

const { Title } = Typography;

const USERNAME_KEY = 'USERNAME';
const PASSWORD_KEY = 'PASSWORD';

function rememberUser(username: string, password: string) {
	localStorage.setItem(USERNAME_KEY, username);
	localStorage.setItem(PASSWORD_KEY, password);
}

function deleteUserFromStorage() {
	localStorage.removeItem(USERNAME_KEY);
	localStorage.removeItem(PASSWORD_KEY);
}

function getUserInfoFromStorage() {
	return {
		username: localStorage.getItem(USERNAME_KEY),
		password: localStorage.getItem(PASSWORD_KEY)
	};
}

const Login: FC = () => {
	// 标记是否是用户点击登录按钮要进行的重定向
	const isLoginRedirect = useRef(false);
	// 用户已经登录，重定向
	const { canAccept, location, Navigate } = usePageAuth();
	const dispatch = useDispatch();

	const [form] = Form.useForm(); // 第三方 hook
	const { run } = useRequest(
		async (username: string, password: string) => {
			const data = await loginService(username, password);
			return data;
		},
		{
			manual: true,
			onSuccess(result) {
				const {
					token = '',
					username,
					nickname,
					routerPermissions
				} = result.data!;
				message.success('登录成功');
				// 存储 token 到 local
				setToken(token);
				// 保存用户信息至 redux, 注意 dispatch 默认是同步的，所以会触发 login 页面重新刷新
				// 重新刷新的结果是 逻辑走到 if(!canAccet) 里面, 重定向至首页，
				// 也就是下面的 navigate 不会生效，即使 navigate 放前面也不生效。
				// 相当于 navigate 是异步的一样，dispatch 的刷新始终最先执行,
				dispatch(loginReducer({ username, nickname, routerPermissions }));
				isLoginRedirect.current = true;
				// 导航到工作区页面 (手动导航)
				//navigate(MANAGE_PATHNAME, { replace: true });
			}
		}
	);

	useEffect(() => {
		const { username, password } = getUserInfoFromStorage();
		form.setFieldsValue({ username, password });
	}, []);

	const onFinish = (values: any) => {
		const { username, password, remember } = values || {};

		run(username, password); // 执行 ajax

		if (remember) {
			rememberUser(username, password);
		} else {
			deleteUserFromStorage();
		}
	};

	// 基于用户信息状态的页面自动导航
	if (!canAccept) {
		const fromPath = location.state?.from?.pathname;
		const toPath = isLoginRedirect.current
			? MANAGE_PATHNAME
			: fromPath &&
			  fromPath !== LOGIN_PATHNAME &&
			  fromPath !== REGISTER_PATHNAME
			? fromPath
			: '/';
		return <Navigate to={toPath} replace state={{ from: location }} />;
	}

	return (
		<div className={styles.container}>
			<div>
				<Space align="center">
					<Title level={2}>
						<UserAddOutlined />
					</Title>
					<Title level={2}>用户登录</Title>
				</Space>
			</div>
			<div>
				<Form
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 16 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					form={form}
				>
					<Form.Item
						label="用户名"
						name="username"
						rules={[
							{ required: true, message: '请输入用户名' },
							{
								type: 'string',
								min: 5,
								max: 20,
								message: '字符长度在 5-20 之间'
							},
							{ pattern: /^\w+$/, message: '只能是字母数字下划线' }
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="密码"
						name="password"
						rules={[{ required: true, message: '请输入密码' }]}
					>
						<Input.Password />
					</Form.Item>
					<Form.Item
						name="remember"
						valuePropName="checked"
						wrapperCol={{ offset: 6, span: 16 }}
					>
						<Checkbox>记住我</Checkbox>
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 6, span: 16 }}>
						<Space>
							<Button type="primary" htmlType="submit">
								登录
							</Button>
							<Link to={REGISTER_PATHNAME}>注册新用户</Link>
						</Space>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default Login;

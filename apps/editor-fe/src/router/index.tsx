import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '@/layouts/MainLayout';
import ManageLayout from '@/layouts/ManageLayout';
import WorkspaceLayout from '@/layouts/WorkspaceLayout';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import List from '@/pages/Manage/List';
import Star from '@/pages/Manage/Star';
import Trash from '@/pages/Manage/Trash';
import AuthComponent from '@/components/AuthComponent';
import NotFound from '@/pages/NotFound';

const Edit = lazy(
	() => import(/* webpackChunkName: "editPage" */ '@/pages/Workspace/Editor')
);
const Stat = lazy(
	() => import(/* webpackChunkName: "statPage" */ '@/pages/Workspace/Stat')
);

// 常用的路由，常量
export const HOME_PATHNAME = '/';
export const LOGIN_PATHNAME = '/login';
export const REGISTER_PATHNAME = '/register';
export const MANAGE_PATHNAME = '/manage';
export const MANAGE_LIST_PATHNAME = '/manage/list';

const router = createBrowserRouter([
	{
		path: HOME_PATHNAME,
		element: <MainLayout />,
		children: [
			{
				index: true,
				// path: HOME_PATHNAME,
				element: <Home />
			},
			{
				path: LOGIN_PATHNAME,
				element: <Login />
			},
			{
				path: REGISTER_PATHNAME,
				element: <Register />
			},
			{
				path: MANAGE_PATHNAME,
				element: (
					<AuthComponent>
						<ManageLayout />
					</AuthComponent>
				),
				children: [
					{
						index: true,
						path: MANAGE_LIST_PATHNAME,
						element: (
							<AuthComponent>
								<List />
							</AuthComponent>
						)
					},
					{
						path: 'star',
						element: (
							<AuthComponent>
								<Star />
							</AuthComponent>
						)
					},
					{
						path: 'trash',
						element: (
							<AuthComponent>
								<Trash />
							</AuthComponent>
						)
					}
				]
			}
		]
	},
	{
		path: 'workspace',
		element: <WorkspaceLayout />,
		children: [
			{
				path: 'edit/:id',
				element: (
					<AuthComponent>
						<Edit />
					</AuthComponent>
				)
			},
			{
				path: 'stat/:id', // statistic 统计
				element: (
					<AuthComponent>
						<Stat />
					</AuthComponent>
				)
			}
		]
	},
	{
		path: '*', // 404 路由配置，都写在最后（兜底）
		element: <NotFound />
	}
]);

export function isLoginOrRegisterPath(pathname: string) {
	if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true;
	return false;
}

export function isNoNeedUserInfoPath(pathname: string) {
	if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname))
		return true;
	return false;
}

export default router;

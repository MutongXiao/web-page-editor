import React, { FC } from 'react';
import { Spin } from 'antd';
import { Outlet } from 'react-router-dom';

import useLoadUserData from '@/hooks/useLoadUserData';

const WorkspaceLayout: FC = () => {
	// 加载用户信息
	const { waitingUserData } = useLoadUserData();

	return (
		<div style={{ height: '100vh' }}>
			{waitingUserData ? (
				<div style={{ textAlign: 'center', marginTop: '100px' }}>
					<Spin tip="数据加载中" size="large">
						<div className="content" />
					</Spin>
				</div>
			) : (
				<Outlet />
			)}
		</div>
	);
};

export default WorkspaceLayout;

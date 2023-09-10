import React, { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button, Space, Divider, message } from 'antd';
import {
	PlusOutlined,
	BarsOutlined,
	StarOutlined,
	DeleteOutlined
} from '@ant-design/icons';
import { useRequest } from 'ahooks';

import { createWorksService } from '@/services/works';
// import usePageAuth from '@/hooks/usePageAuth';
// import { LOGIN_PATHNAME } from '@/router';
import styles from './ManageLayout.module.less';

const ManageLayout: FC = () => {
	const { pathname } = location;
	const nav = useNavigate();
	const {
		loading,
		// error,
		run: handleCreateClick
	} = useRequest(createWorksService, {
		manual: true,
		onSuccess(res) {
			const data = res.data!;
			nav(`/workspace/edit/${data.id}`);
			message.success('创建成功');
		}
	});

	// 也可以不在路由配置 AuthCompoent 鉴权，将鉴权放在组件内部实现（如有特殊需要，否则一般抽离在外部鉴权）
	// const { hasAuth, location, Navigate } = usePageAuth();
	// if (!hasAuth) {
	// 	return <Navigate to={LOGIN_PATHNAME} replace state={{ from: location }} />;
	// }

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<Space direction="vertical">
					<Button
						type="primary"
						size="large"
						icon={<PlusOutlined />}
						onClick={handleCreateClick}
						disabled={loading}
					>
						新建问卷
					</Button>
					<Divider style={{ borderTop: 'transparent' }} />
					<Button
						type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
						size="large"
						icon={<BarsOutlined />}
						onClick={() => nav('/manage/list')}
					>
						我的问卷
					</Button>
					<Button
						type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
						size="large"
						icon={<StarOutlined />}
						onClick={() => nav('/manage/star')}
					>
						星标问卷
					</Button>
					<Button
						type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
						size="large"
						icon={<DeleteOutlined />}
						onClick={() => nav('/manage/trash')}
					>
						回收站
					</Button>
				</Space>
			</div>
			<div className={styles.right}>
				<Outlet />
			</div>
		</div>
	);
};

export default ManageLayout;

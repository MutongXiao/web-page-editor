import React, { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Spin } from 'antd';

import Logo from '@/components/Logo';
import UserInfo from '@/components/UserInfo';
import useLoadUserData from '@/hooks/useLoadUserData';
import styles from './MainLayout.module.less';

const { Header, Content, Footer } = Layout;

const MainLayout: FC = () => {
	const { waitingUserData } = useLoadUserData();

	return (
		<Layout className={styles.container}>
			<Header className={styles.header}>
				<div className={styles.left}>
					<Logo />
				</div>
				<div className={styles.right}>
					<UserInfo />
				</div>
			</Header>
			<Layout className={styles.main}>
				<Content>
					{waitingUserData ? (
						<div style={{ textAlign: 'center', marginTop: '60px' }}>
							<Spin />
						</div>
					) : (
						<Outlet />
					)}
				</Content>
			</Layout>
			<Footer className={styles.footer}>
				MiniWeb Editor &copy;2023 - Present. Created By MutongXiao
			</Footer>
		</Layout>
	);
};

export default MainLayout;

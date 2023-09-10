import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from 'antd';

import { MANAGE_PATHNAME } from '@/router';
import styles from './Home.module.less';

const { Title, Paragraph } = Typography;

const Home: FC = () => {
	const nav = useNavigate();

	return (
		<div className={styles.container}>
			<div className={styles.info}>
				<Title>问卷调查 | 海报设计</Title>
				<Paragraph>
					已累计创建问卷 100 份，发布海报 90 份，收到答卷 980 份
				</Paragraph>
				<div>
					<Button type="primary" onClick={() => nav(MANAGE_PATHNAME)}>
						开始使用
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Home;

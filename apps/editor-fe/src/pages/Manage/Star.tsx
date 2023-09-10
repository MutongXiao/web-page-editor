import React, { FC } from 'react';
import { useTitle } from 'ahooks';
import { Typography, Empty, Spin } from 'antd';

import WorksCard from '@/components/WorksCard';
import ListSearch from '@/components/ListSearch';
import PaginationList from '@/components/PaginationList';
import useLoadWorksListData from '@/hooks/useLoadWorksListData';
import styles from './common.module.less';

const { Title } = Typography;

const Star: FC = () => {
	useTitle('小慕问卷 - 星标问卷');
	const { data, loading } = useLoadWorksListData({ isStar: true });
	const { list = [], total = 0 } = data || {};

	return (
		<>
			<div className={styles.header}>
				<div className={styles.left}>
					<Title level={3}>星标问卷</Title>
				</div>
				<div className={styles.right}>
					<ListSearch />
				</div>
			</div>
			<div className={styles.content}>
				{loading && (
					<div style={{ textAlign: 'center' }}>
						<Spin />
					</div>
				)}
				{!loading && list.length === 0 && <Empty description="暂无数据" />}
				{list.length > 0 &&
					list.map((q: any) => {
						const { _id } = q;
						return <WorksCard key={_id} {...q} />;
					})}
			</div>
			<div className={styles.footer}>
				<PaginationList total={total} />
			</div>
		</>
	);
};

export default Star;

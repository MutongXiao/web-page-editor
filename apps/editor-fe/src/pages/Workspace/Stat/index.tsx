import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin, Result, Button } from 'antd';
import { useTitle } from 'ahooks';

import useLoadWorksDetailData from '@/hooks/useLoadWorksDetailData';
import useGetLocalWorksPageInfo from '@/hooks/useGetLocalWorksPageInfo';
import StatHeader from './StatHeader';
import WorksWidgets from './WorksWidgets';
import WorksStatTable from './WorksStatTable';
import ChartStat from './ChartStat';
import styles from './index.module.less';

const Stat: FC = () => {
	const nav = useNavigate();
	const { loading } = useLoadWorksDetailData();
	const { title, isPublished } = useGetLocalWorksPageInfo();

	// 状态提升 selectedId type
	const [selectedWidgetId, setSelectedWidgetId] = useState('');
	const [selectedWidgetName, setSelectedWidgetName] = useState('');

	// 修改标题
	useTitle(`问卷统计 - ${title}`);

	// loading 效果
	const LoadingELem = (
		<div style={{ textAlign: 'center', marginTop: '60px' }}>
			<Spin />
		</div>
	);

	// Content Elem
	function genContentElem() {
		if (typeof isPublished === 'boolean' && !isPublished) {
			return (
				<div style={{ flex: '1' }}>
					<Result
						status="warning"
						title="该页面尚未发布"
						extra={
							<Button type="primary" onClick={() => nav(-1)}>
								返回
							</Button>
						}
					></Result>
				</div>
			);
		}

		return (
			<>
				<div className={styles.left}>
					<WorksWidgets
						selectedWidgetId={selectedWidgetId}
						setSelectedWidgetId={setSelectedWidgetId}
						setSelectedWidgetName={setSelectedWidgetName}
					/>
				</div>
				<div className={styles.main}>
					<WorksStatTable
						selectedWidgetId={selectedWidgetId}
						setSelectedWidgetId={setSelectedWidgetId}
						setSelectedWidgetName={setSelectedWidgetName}
					/>
				</div>
				<div className={styles.right}>
					<ChartStat
						selectedWidgetId={selectedWidgetId}
						selectedWidgetName={selectedWidgetName}
					/>
				</div>
			</>
		);
	}

	return (
		<div className={styles.container}>
			<StatHeader />
			<div className={styles['content-wrapper']}>
				{loading && LoadingELem}
				{!loading && <div className={styles.content}>{genContentElem()}</div>}
			</div>
		</div>
	);
};

export default Stat;

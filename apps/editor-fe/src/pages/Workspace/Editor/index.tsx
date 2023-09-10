import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTitle } from 'ahooks';
import { Spin } from 'antd';

import { changeSelectedId } from '@/store/worksWidgets';
import useLoadWorksDetailData from '@/hooks/useLoadWorksDetailData';
import useGetLocalWorksPageInfo from '@/hooks/useGetLocalWorksPageInfo';
import EditHeader from './components/EditHeader';
import EditCanvas from './components/EditCanvas';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import styles from './index.module.less';

const Edit: FC = () => {
	// 修改标题
	const { title } = useGetLocalWorksPageInfo();
	useTitle(`问卷编辑 - ${title}`);
	const dispatch = useDispatch();
	const { loading } = useLoadWorksDetailData();

	function clearSelectedId() {
		dispatch(changeSelectedId(''));
	}

	return (
		<div className={styles.container}>
			<EditHeader />
			<div className={styles['content-wrapper']}>
				<div className={styles.content}>
					<div className={styles.left}>
						<LeftPanel />
					</div>
					<div className={styles.main} onClick={clearSelectedId}>
						<div className={styles['canvas-wrapper']}>
							{loading ? (
								<div style={{ textAlign: 'center', marginTop: '24px' }}>
									<Spin />
								</div>
							) : (
								<EditCanvas />
							)}
						</div>
					</div>
					<div className={styles.right}>
						<RightPanel />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Edit;

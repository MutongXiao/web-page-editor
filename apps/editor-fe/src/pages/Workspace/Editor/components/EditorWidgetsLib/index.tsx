import React, { FC, useCallback } from 'react';
import { nanoid } from 'nanoid';
import { Typography } from 'antd';
import { useDispatch } from 'react-redux';

import {
	editorWidgetGroup,
	EditorWidgetConfType
} from '@/utils/getEditorWidgets';
import { addWidget } from '@/store/worksWidgets';
import styles from './EditorWidgetsLib.module.less';

const { Title } = Typography;

function getWidgetConf(Widget: EditorWidgetConfType) {
	const { title, widgetName, defaultProps } = Widget;
	const dispatch = useDispatch();

	const handleClick = useCallback(() => {
		dispatch(
			addWidget({
				fe_id: nanoid(), // 前端生成的 id
				title,
				widgetName,
				props: defaultProps
			})
		);
	}, []);

	return (
		<div key={widgetName} className={styles.wrapper} onClick={handleClick}>
			<div className={styles.component}>
				<Widget />
			</div>
		</div>
	);
}

const EditorWidgets: FC = () => {
	return (
		<>
			{editorWidgetGroup.map((group, index) => {
				const { groupId, groupName, widgets } = group;

				return (
					<div key={groupId}>
						<Title
							level={3}
							style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}
						>
							{groupName}
						</Title>
						<div>{widgets.map((c) => getWidgetConf(c))}</div>
					</div>
				);
			})}
		</>
	);
};

export default EditorWidgets;

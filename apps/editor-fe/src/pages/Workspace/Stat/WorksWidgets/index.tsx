import React, { FC } from 'react';
import classNames from 'classnames';

import useGetLocalWorksWidgets from '@/hooks/useGetLocalWorksWidgets';
import { getEditorWidgetByName } from '@/utils/getEditorWidgets';
import styles from './WorksWidgets.module.less';

type PropsType = {
	selectedWidgetId: string;
	setSelectedWidgetId: (id: string) => void;
	setSelectedWidgetName: (type: string) => void;
};

const CollectionWidgets: FC<PropsType> = (props) => {
	const { selectedWidgetId, setSelectedWidgetId, setSelectedWidgetName } =
		props;
	const { widgetsList } = useGetLocalWorksWidgets();

	return (
		<div className={styles.container}>
			{widgetsList
				.filter((c) => !c.isHidden) // 过滤隐藏的组件
				.map((c) => {
					const { fe_id, props, widgetName } = c;

					const componentConf = getEditorWidgetByName(widgetName);
					if (!componentConf) return null;

					const Widget = componentConf;

					// 拼接 class name
					const wrapperDefaultClassName = styles['component-wrapper'];
					const selectedClassName = styles.selected;
					const wrapperClassName = classNames({
						[wrapperDefaultClassName]: true,
						[selectedClassName]: fe_id === selectedWidgetId // 是否选中
					});

					return (
						<div
							className={wrapperClassName}
							key={fe_id}
							onClick={() => {
								setSelectedWidgetId(fe_id);
								setSelectedWidgetName(widgetName);
							}}
						>
							<div className={styles.component}>
								<Widget {...props}></Widget>
							</div>
						</div>
					);
				})}
		</div>
	);
};

export default CollectionWidgets;

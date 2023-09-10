import React, { FC, MouseEvent, useRef } from 'react';
import { useDebounceEffect } from 'ahooks';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import useGetLocalWorksWidgets from '@/hooks/useGetLocalWorksWidgets';
import useGetLocalWorksPageInfo from '@/hooks/useGetLocalWorksPageInfo';
import { getEditorWidgetByName } from '@/utils/getEditorWidgets';
import { updateWorksByIdService } from '@/services/works';
import {
	type WorksWidgeInfoType,
	changeSelectedId,
	moveWidget
} from '@/store/worksWidgets';
import useBindWorkspaceHotKey from '@/hooks/useBindWorkspaceHotKey';
import SortableContainer from '@/components/DragSortable/SortableContainer';
import SortableItem from '@/components/DragSortable/SortableItem';
import styles from './EditCanvas.module.less';

function genWidget(widgetInfo: WorksWidgeInfoType) {
	const { widgetName, props } = widgetInfo; // 每个组件的信息，是从 redux store 获取的（服务端获取）
	const Widget = getEditorWidgetByName(widgetName);

	if (!Widget) return null;
	return <Widget {...props} />;
}

const EditCanvas: FC = () => {
	const { widgetsList, selectedId } = useGetLocalWorksWidgets();
	const { id } = useParams();
	const pageInfo = useGetLocalWorksPageInfo();
	const dispatch = useDispatch();
	const canvasFirstLoad = useRef(true);

	// 绑定快捷键
	useBindWorkspaceHotKey();

	// 自定保存（不是定期保存，不是定时器）
	useDebounceEffect(
		() => {
			if (!id || canvasFirstLoad.current) {
				// useDebounceEffect 在页面加载时都会执行一次，加个标志位判断
				canvasFirstLoad.current = false;
				return;
			}
			updateWorksByIdService(id, { ...pageInfo, widgetsList });
		},
		[widgetsList, pageInfo],
		{
			wait: 1000
		}
	);

	// SortableContainer 组件的 items 属性，需要每个 item 都有 id
	const widgetListWithId = widgetsList.map((c) => {
		return { ...c, id: c.fe_id };
	});

	// 拖拽排序结束
	function handleDragEnd(oldIndex: number, newIndex: number) {
		dispatch(moveWidget({ oldIndex, newIndex }));
	}

	// 点击组件，选中
	function handleClick(event: MouseEvent, id: string) {
		event.stopPropagation(); // 阻止冒泡
		dispatch(changeSelectedId(id));
	}

	return (
		<SortableContainer items={widgetListWithId} onDragEnd={handleDragEnd}>
			<div className={styles.canvas}>
				{widgetsList
					.filter((c) => !c.isHidden)
					.map((c) => {
						const { fe_id, isLocked } = c;
						// 拼接 class name
						const wrapperDefaultClassName = styles['component-wrapper'];
						const selectedClassName = styles.selected;
						const lockedClassName = styles.locked;
						const wrapperClassName = classNames({
							[wrapperDefaultClassName]: true,
							[selectedClassName]: fe_id === selectedId,
							[lockedClassName]: isLocked
						});
						const Widget = genWidget(c);

						if (!Widget) return null;
						return (
							<SortableItem key={fe_id} id={fe_id}>
								<div
									className={wrapperClassName}
									onClick={(e) => handleClick(e, fe_id)}
								>
									<div className={styles.component}>{Widget}</div>
								</div>
							</SortableItem>
						);
					})}
			</div>
		</SortableContainer>
	);
};

export default EditCanvas;

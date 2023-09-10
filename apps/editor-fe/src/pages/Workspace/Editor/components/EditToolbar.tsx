import React, { FC } from 'react';
import { Button, Space, Tooltip } from 'antd';
import {
	DeleteOutlined,
	EyeInvisibleOutlined,
	LockOutlined,
	CopyOutlined,
	BlockOutlined,
	UpOutlined,
	DownOutlined,
	UndoOutlined,
	RedoOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';

import {
	type WorksWidgetsStateType,
	removeSelectedWidget,
	changeWidgetHidden,
	toggleWidgetLocked,
	copySelectedWidget,
	pasteCopiedWidget,
	moveWidget
} from '@/store/worksWidgets';
import type { GlobalReduxStateType } from '@/store';
import useGetLocalWorksWidgets from '@/hooks/useGetLocalWorksWidgets';

const EditToolbar: FC = () => {
	const dispatch = useDispatch();
	const { selectedId, widgetsList, selectedWidget, copiedWidget } =
		useGetLocalWorksWidgets();
	const { isLocked } = selectedWidget || {};
	const length = widgetsList.length;
	const selectedIndex = widgetsList.findIndex((c) => c.fe_id === selectedId);
	const isFirst = selectedIndex <= 0; // 第一个
	const isLast = selectedIndex + 1 >= length; // 最后一个
	const undoPast = useSelector<GlobalReduxStateType>(
		(state) => state.worksWidgets.past
	) as WorksWidgetsStateType[];
	const redoFuture = useSelector<GlobalReduxStateType>(
		(state) => state.worksWidgets.future
	) as WorksWidgetsStateType[];

	// 删除组件
	function handleDelete() {
		dispatch(removeSelectedWidget());
	}

	// 隐藏组件
	function handleHidden() {
		dispatch(changeWidgetHidden({ fe_id: selectedId, isHidden: true }));
	}

	// 锁定组件
	function handleLock() {
		dispatch(toggleWidgetLocked({ fe_id: selectedId }));
	}

	// 复制
	function copy() {
		dispatch(copySelectedWidget());
	}

	// 粘贴
	function paste() {
		dispatch(pasteCopiedWidget());
	}

	// 上移
	function moveUp() {
		if (isFirst) return;
		dispatch(
			moveWidget({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 })
		);
	}

	// 下移
	function moveDown() {
		if (isLast) return;
		dispatch(
			moveWidget({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 })
		);
	}

	// 撤销
	function undo() {
		// undoPast 会有一条 redux initSate 在加载数据后的变更记录，应该忽略掉，不执行回退到初始状态
		if (undoPast.length <= 1) return;
		dispatch(UndoActionCreators.undo());
	}

	// 重做
	function redo() {
		if (redoFuture.length === 0) return;
		dispatch(UndoActionCreators.redo());
	}

	return (
		<Space>
			<Tooltip title="删除">
				<Button
					shape="circle"
					icon={<DeleteOutlined />}
					onClick={handleDelete}
				></Button>
			</Tooltip>
			<Tooltip title="隐藏">
				<Button
					shape="circle"
					icon={<EyeInvisibleOutlined />}
					onClick={handleHidden}
				></Button>
			</Tooltip>
			<Tooltip title="锁定">
				<Button
					shape="circle"
					icon={<LockOutlined />}
					onClick={handleLock}
					type={isLocked ? 'primary' : 'default'}
				></Button>
			</Tooltip>
			<Tooltip title="复制">
				<Button shape="circle" icon={<CopyOutlined />} onClick={copy}></Button>
			</Tooltip>
			<Tooltip title="粘贴">
				<Button
					shape="circle"
					icon={<BlockOutlined />}
					onClick={paste}
					disabled={copiedWidget == null}
				></Button>
			</Tooltip>
			<Tooltip title="上移">
				<Button
					shape="circle"
					icon={<UpOutlined />}
					onClick={moveUp}
					disabled={isFirst}
				></Button>
			</Tooltip>
			<Tooltip title="下移">
				<Button
					shape="circle"
					icon={<DownOutlined />}
					onClick={moveDown}
					disabled={isLast}
				></Button>
			</Tooltip>
			<Tooltip title="撤销">
				<Button
					shape="circle"
					icon={<UndoOutlined />}
					onClick={undo}
					disabled={undoPast.length <= 1}
				/>
			</Tooltip>
			<Tooltip title="重做">
				<Button
					shape="circle"
					icon={<RedoOutlined />}
					onClick={redo}
					disabled={redoFuture.length === 0}
				/>
			</Tooltip>
		</Space>
	);
};

export default EditToolbar;

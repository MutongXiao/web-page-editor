import { useKeyPress } from 'ahooks';
import { useDispatch } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';

import {
	removeSelectedWidget,
	copySelectedWidget,
	pasteCopiedWidget,
	selectPrevWidget,
	selectNextWidget
} from '@/store/worksWidgets';

/**
 * 判断 activeElem 是否合法
 */
function isActiveElementValid() {
	const activeElem = document.activeElement;

	// // 没有增加 dnd-kit 之前
	// if (activeElem === document.body) return true // 光标没有 focus 到 input

	// 增加了 dnd-kit 以后
	if (activeElem === document.body) return true;
	if (activeElem?.matches('div[role="button"]')) return true;

	return false;
}

function useBindWorkspaceHotKey() {
	const dispatch = useDispatch();

	// 删除组件
	useKeyPress(['backspace', 'delete'], () => {
		if (!isActiveElementValid()) return;
		dispatch(removeSelectedWidget());
	});

	// 复制
	useKeyPress(['ctrl.c', 'meta.c'], () => {
		if (!isActiveElementValid()) return;
		dispatch(copySelectedWidget());
	});

	// 粘贴
	useKeyPress(['ctrl.v', 'meta.v'], () => {
		if (!isActiveElementValid()) return;
		dispatch(pasteCopiedWidget());
	});

	// 选中上一个
	useKeyPress('uparrow', () => {
		if (!isActiveElementValid()) return;
		dispatch(selectPrevWidget());
	});

	// 选中下一个
	useKeyPress('downarrow', () => {
		if (!isActiveElementValid()) return;
		dispatch(selectNextWidget());
	});

	// 撤销
	useKeyPress(
		['ctrl.z', 'meta.z'],
		() => {
			if (!isActiveElementValid()) return;
			dispatch(UndoActionCreators.undo());
		},
		{
			exactMatch: true // 严格匹配
		}
	);

	// 重做
	useKeyPress(['ctrl.shift.z', 'meta.shift.z'], () => {
		if (!isActiveElementValid()) return;
		dispatch(UndoActionCreators.redo());
	});
}

export default useBindWorkspaceHotKey;

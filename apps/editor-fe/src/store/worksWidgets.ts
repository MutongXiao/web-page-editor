import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import cloneDeep from 'lodash.clonedeep';
import { nanoid } from 'nanoid';
import { arrayMove } from '@dnd-kit/sortable';

import type { EditorWidgetProps } from '@/utils/getEditorWidgets';

export type WorksWidgeInfoType = {
	fe_id: string; // 前端生成的 id ，服务端 Mongodb 不认这种格式，所以自定义一个 fe_id
	widgetName: string;
	title: string;
	isHidden?: boolean;
	isLocked?: boolean;
	props: EditorWidgetProps;
};

export type WorksWidgetsStateType = {
	selectedId: string;
	widgetsList: Array<WorksWidgeInfoType>;
	copiedWidget: WorksWidgeInfoType | null;
};

const INIT_STATE: WorksWidgetsStateType = {
	selectedId: '',
	widgetsList: [],
	copiedWidget: null
};

export const worksWidgetsSlice = createSlice({
	name: 'worksWidgets',
	initialState: INIT_STATE,
	reducers: {
		// 重置所有组件
		resetWidgets: (
			state: WorksWidgetsStateType,
			action: PayloadAction<WorksWidgetsStateType>
		) => {
			return action.payload;
		},

		// 修改 selectedId
		changeSelectedId: (
			state: WorksWidgetsStateType,
			action: PayloadAction<string>
		) => {
			state.selectedId = action.payload;
		},

		// 添加新组件
		addWidget: (
			state: WorksWidgetsStateType,
			action: PayloadAction<WorksWidgeInfoType>
		) => {
			const newComponent = action.payload;
			insertNewWidgett(state, newComponent);
		},

		// 修改组件属性
		changeWidgetProps: (
			state: WorksWidgetsStateType,
			action: PayloadAction<{ fe_id: string; newProps: EditorWidgetProps }>
		) => {
			const { fe_id, newProps } = action.payload;

			// 当前要修改属性的这个组件
			const curComp = state.widgetsList.find((c) => c.fe_id === fe_id);
			if (curComp) {
				curComp.props = {
					...curComp.props,
					...newProps
				};
			}
		},

		// 删除选中的组件
		removeSelectedWidget: (state: WorksWidgetsStateType) => {
			const { widgetsList = [], selectedId: removedId } = state;

			// 重新计算 selectedId
			const newSelectedId = getNextSelectedId(removedId, widgetsList);
			state.selectedId = newSelectedId;

			const index = widgetsList.findIndex((c) => c.fe_id === removedId);
			widgetsList.splice(index, 1);
		},

		// 隐藏/显示 组件
		changeWidgetHidden: (
			state: WorksWidgetsStateType,
			action: PayloadAction<{ fe_id: string; isHidden: boolean }>
		) => {
			const { widgetsList = [] } = state;
			const { fe_id, isHidden } = action.payload;
			// 重新计算 selectedId
			let newSelectedId = '';
			if (isHidden) {
				// 要隐藏
				newSelectedId = getNextSelectedId(fe_id, widgetsList);
			} else {
				// 要显示
				newSelectedId = fe_id;
			}

			state.selectedId = newSelectedId;
			const curComp = widgetsList.find((c) => c.fe_id === fe_id);
			if (curComp) {
				curComp.isHidden = isHidden;
			}
		},

		// 锁定/解锁 组件
		toggleWidgetLocked: (
			state: WorksWidgetsStateType,
			action: PayloadAction<{ fe_id: string }>
		) => {
			const { fe_id } = action.payload;
			const curComp = state.widgetsList.find((c) => c.fe_id === fe_id);
			if (curComp) {
				curComp.isLocked = !curComp.isLocked;
			}
		},

		// 拷贝当前选中的组件
		copySelectedWidget: (state: WorksWidgetsStateType) => {
			const { selectedId, widgetsList = [] } = state;
			const selectedComponent = widgetsList.find((c) => c.fe_id === selectedId);
			if (selectedComponent == null) return;
			state.copiedWidget = cloneDeep(selectedComponent); // 深拷贝
		},

		// 粘贴组件
		pasteCopiedWidget: (state: WorksWidgetsStateType) => {
			const { copiedWidget } = state;
			if (copiedWidget == null) return;
			// 要把 fe_id 给修改了，重要！！
			copiedWidget.fe_id = nanoid();
			// 插入 已复制的组件
			insertNewWidgett(state, copiedWidget);
		},

		// 选中上一个
		selectPrevWidget: (state: WorksWidgetsStateType) => {
			const { selectedId, widgetsList } = state;
			const selectedIndex = widgetsList.findIndex(
				(c) => c.fe_id === selectedId
			);

			if (selectedIndex < 0) return; // 未选中组件
			if (selectedIndex <= 0) return; // 已经选中了第一个，无法在向上选中

			state.selectedId = widgetsList[selectedIndex - 1].fe_id;
		},

		// 选中下一个
		selectNextWidget: (state: WorksWidgetsStateType) => {
			const { selectedId, widgetsList } = state;
			const selectedIndex = widgetsList.findIndex(
				(c) => c.fe_id === selectedId
			);

			if (selectedIndex < 0) return; // 未选中组件
			if (selectedIndex + 1 === widgetsList.length) return; // 已经选中了最后一个，无法再向下选中

			state.selectedId = widgetsList[selectedIndex + 1].fe_id;
		},

		// 修改组件标题
		changeWidgetTitle: (
			state: WorksWidgetsStateType,
			action: PayloadAction<{ fe_id: string; title: string }>
		) => {
			const { title, fe_id } = action.payload;
			const curComp = state.widgetsList.find((c) => c.fe_id === fe_id);
			if (curComp) curComp.title = title;
		},

		// 移动组件位置
		moveWidget: (
			state: WorksWidgetsStateType,
			action: PayloadAction<{ oldIndex: number; newIndex: number }>
		) => {
			const { widgetsList: curWidgetList } = state;
			const { oldIndex, newIndex } = action.payload;

			state.widgetsList = arrayMove(curWidgetList, oldIndex, newIndex);
		}
	}
});

/**
 * 插入新组件
 * @param draft state draft
 * @param newComponent 新组件
 */
function insertNewWidgett(
	state: WorksWidgetsStateType,
	newComponent: WorksWidgeInfoType
) {
	const { selectedId, widgetsList } = state;
	const index = widgetsList.findIndex((c) => c.fe_id === selectedId);

	if (index < 0) {
		// 未选中任何组件
		state.widgetsList.push(newComponent);
	} else {
		// 选中了组件，插入到 index 后面
		state.widgetsList.splice(index + 1, 0, newComponent);
	}

	state.selectedId = newComponent.fe_id;
}

/**
 * 对于删除操作，获取下一个 selectedId
 * @param fe_id 当前的 id
 * @param componentList 组件列表
 */
function getNextSelectedId(fe_id: string, widgetList: WorksWidgeInfoType[]) {
	const visibleWidgetList = widgetList.filter((c) => !c.isHidden);
	const index = visibleWidgetList.findIndex((c) => c.fe_id === fe_id);
	if (index < 0) return '';

	// 重新计算 selectedId
	let newSelectedId = '';
	const length = visibleWidgetList.length;
	if (length <= 1) {
		// 组件长度就一个，被删除了，就没有组件
		newSelectedId = '';
	} else {
		// 组件长度 > 1
		if (index + 1 === length) {
			// 要删除最后一个，就要选中上一个
			newSelectedId = visibleWidgetList[index - 1].fe_id;
		} else {
			// 要删除的不是最后一个，删除以后，选中下一个
			newSelectedId = visibleWidgetList[index + 1].fe_id;
		}
	}

	return newSelectedId;
}

export const {
	resetWidgets,
	addWidget,
	changeSelectedId,
	changeWidgetProps,
	removeSelectedWidget,
	changeWidgetHidden,
	toggleWidgetLocked,
	copySelectedWidget,
	pasteCopiedWidget,
	selectPrevWidget,
	selectNextWidget,
	changeWidgetTitle,
	moveWidget
} = worksWidgetsSlice.actions;
export default worksWidgetsSlice.reducer;

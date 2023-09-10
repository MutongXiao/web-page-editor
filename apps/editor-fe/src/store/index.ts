import { configureStore } from '@reduxjs/toolkit';
import undoable, { excludeAction, StateWithHistory } from 'redux-undo';

import userReducer, { UserStateType } from './userReducer';
import worksWidgetsReducer, {
	type WorksWidgetsStateType
} from './worksWidgets';
import worksPageInfoReducer, {
	type WorksPageInfoStateType
} from './worksPageInfo';

export type GlobalReduxStateType = {
	user: UserStateType;
	// worksWidgets: WorksWidgetsStateType;
	worksWidgets: StateWithHistory<WorksWidgetsStateType>; // 增加了 undo
	worksPageInfo: WorksPageInfoStateType;
};

export default configureStore<GlobalReduxStateType>({
	reducer: {
		user: userReducer,
		// // 没有 undo
		// canvasWidgets: canvasWidgetsReducer,
		worksWidgets: undoable(worksWidgetsReducer, {
			limit: 20, // 限制 undo 20 步
			filter: excludeAction([
				'worksWidgets/resetWidgets',
				'worksWidgets/changeSelectedId',
				'worksWidgets/selectPrevWidget',
				'worksWidgets/selectNextWidget'
			])
		}),
		worksPageInfo: worksPageInfoReducer
	}
});

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type WorksPageInfoStateType = {
	title: string;
	desc?: string;
	js?: string;
	css?: string;
	isPublished?: boolean;
};

const INIT_STATE: WorksPageInfoStateType = {
	title: '',
	desc: '',
	js: '',
	css: ''
};
// ReduxToolkit 的 createReducerAPI 在内部自动使用 Immer。已内置 immer
// 反过来，createSlice 在内部使用 createReduce, 所以也可以安全地进行“突变”状态:
const worksPageInfoSlice = createSlice({
	name: 'worksPageInfo',
	initialState: INIT_STATE,
	reducers: {
		resetPageInfo: (
			state: WorksPageInfoStateType,
			action: PayloadAction<WorksPageInfoStateType>
		) => {
			// Construct a new result immutably and return it
			return action.payload;
		},

		// 修改标题
		changePageTitle: (
			state: WorksPageInfoStateType,
			action: PayloadAction<string>
		) => {
			//// "Mutate" the existing state, no return value needed
			state.title = action.payload;
		}
	}
});

export const { resetPageInfo, changePageTitle } = worksPageInfoSlice.actions;

export default worksPageInfoSlice.reducer;

import axios, { type ResponseType } from './ajax';

export type SearchOption = {
	keyword: string;
	isStar: boolean;
	isDeleted: boolean;
	page: number;
	pageSize: number;
};

export type WorksInfo = {
	id: string;
	title: string;
	desc: string;
	js: string;
	css: string;
	isDeleted: boolean;
	isPublished: boolean;
	worksWidgetList: {
		fe_id: string; // 注意，由于统计页，左侧和中间需要数据完全一直，所以要写死 fe_id ，不能用 Random.id()
		widgetName: string; // 组件类型，不能重复，前后端统一好
		title: string;
		isHidden: boolean;
		isLocked: boolean;
		props: Record<string, any>;
	}[];
};
// 获取单个问卷信息
export async function getWorksDetailService(
	id: string
): Promise<ResponseType<WorksInfo>> {
	const url = `/api/works/${id}`;
	const data = (await axios.get(url)) as ResponseType<WorksInfo>;
	return data;
}

// 创建问卷
export async function createWorksService(): Promise<
	ResponseType<{ id: string }>
> {
	const url = '/api/works';
	const data = (await axios.post(url)) as ResponseType<{
		id: string;
	}>;
	return data;
}

export type WorksList = {
	total: number;
	list: Array<{
		_id: string;
		title: string;
		isPublished: boolean;
		isStar: boolean;
		answerCount: number;
		createdAt: string;
		isDeleted: boolean; // 假删除
	}>;
};
// 获取（查询）问卷列表
export async function getWorksListService(
	opt: Partial<SearchOption> = {}
): Promise<ResponseType<WorksList>> {
	const url = '/api/works';
	const data = (await axios.get(url, {
		params: opt
	})) as ResponseType<WorksList>;
	return data;
}

// 更新单个问卷
export async function updateWorksByIdService(
	id: string,
	opt: { [key: string]: any }
): Promise<ResponseType<null>> {
	const url = `/api/works/${id}`;
	const data = (await axios.patch(url, opt)) as ResponseType<null>;
	return data;
}

// 复制问卷
export async function duplicateWorksService(id: string): Promise<
	ResponseType<{
		id: string;
	}>
> {
	const url = `/api/works/duplicate/${id}`;
	const data = (await axios.post(url)) as ResponseType<{
		id: string;
	}>;
	return data;
}

// 批量彻底删除
export async function deleteWorksByIdsService(
	ids: string[]
): Promise<ResponseType<null>> {
	const url = '/api/works';
	const data = (await axios.delete(url, {
		data: { ids }
	})) as ResponseType<null>;
	return data;
}

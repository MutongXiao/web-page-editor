import axios, { type ResponseType } from './ajax';

export type WorksStatList = {
	total: number; // 分页
	list: Array<{ _id: string; [key: string]: any }>;
};

// 获取问卷的统计列表
export async function getQuestionStatListService(
	questionId: string,
	opt: { page: number; pageSize: number }
): Promise<ResponseType<WorksStatList>> {
	const url = `/api/stat/${questionId}`;
	const data = await axios.get(url, { params: opt });
	return data;
}

export type StatInfo = {
	stat: Array<{ name: string; count: number }>;
};
// 获取组件统计数据汇总
export async function getComponentStatService(
	questionId: string,
	componentId: string
): Promise<ResponseType<StatInfo>> {
	const url = `/api/stat/${questionId}/${componentId}`;
	const data = (await axios.get(url)) as ResponseType<StatInfo>;
	return data;
}

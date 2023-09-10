import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { useDispatch } from 'react-redux';
import { getWorksDetailService } from '../services/works';
import { resetWidgets } from '@/store/worksWidgets';
import { resetPageInfo } from '../store/worksPageInfo';

function useLoadWorksDetailData() {
	const { id = '' } = useParams();
	const dispatch = useDispatch();

	// ajax 加载
	const { data, loading, error, run } = useRequest(
		async (id: string) => {
			if (!id) throw new Error('没有画布 id');
			const data = await getWorksDetailService(id);
			return data.data;
		},
		{
			manual: true
		}
	);

	// 根据获取的 data 设置 redux store
	useEffect(() => {
		if (!data) return;

		const {
			title = '',
			desc = '',
			js = '',
			css = '',
			isPublished = false,
			worksWidgetList = []
		} = data;

		// 获取默认的 selectedId
		let selectedId = '';
		if (worksWidgetList.length > 0) {
			selectedId = worksWidgetList[0].fe_id; // 默认选中第一个组件
		}

		// 把加载到的画布组件数据 存储到 Redux store 中
		dispatch(
			resetWidgets({
				widgetsList: worksWidgetList,
				selectedId,
				copiedWidget: null
			})
		);

		// 把 pageInfo 存储到 redux store
		dispatch(resetPageInfo({ title, desc, js, css, isPublished }));
	}, [data]);

	// 判断 id 变化，执行 ajax 加载问卷数据
	useEffect(() => {
		run(id);
	}, [id]);

	return { loading, error };
}

export default useLoadWorksDetailData;

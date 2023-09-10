import { useSearchParams } from 'react-router-dom';
import { useRequest } from 'ahooks';

import { getWorksListService } from '@/services/works';
import {
	LIST_SEARCH_PARAM_KEY,
	LIST_PAGE_PARAM_KEY,
	LIST_PAGE_SIZE_PARAM_KEY,
	LIST_PAGE_SIZE
} from '@/constant/index';

type OptionType = {
	isStar: boolean;
	isDeleted: boolean;
};

function useLoadWorksListData(opt: Partial<OptionType> = {}) {
	const { isStar, isDeleted } = opt;
	const [searchParams] = useSearchParams();

	const { data, loading, error, refresh } = useRequest(
		async () => {
			const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
			const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1;
			const pageSize =
				parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') ||
				LIST_PAGE_SIZE;

			const result = await getWorksListService({
				keyword,
				isStar,
				isDeleted,
				page,
				pageSize
			});
			return result.data;
		},
		{
			refreshDeps: [searchParams] // 刷新的依赖项
		}
	);

	return { data, loading, error, refresh };
}

export default useLoadWorksListData;
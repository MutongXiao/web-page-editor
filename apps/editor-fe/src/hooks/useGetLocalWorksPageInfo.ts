import { useSelector } from 'react-redux';
import type { GlobalReduxStateType } from '../store';
import type { WorksPageInfoStateType } from '@/store/worksPageInfo';

function useGetLocalWorksPageInfo() {
	const pageInfo = useSelector<GlobalReduxStateType>(
		(state) => state.worksPageInfo
	) as WorksPageInfoStateType;
	return pageInfo;
}

export default useGetLocalWorksPageInfo;

import { useSelector } from 'react-redux';

import type { GlobalReduxStateType } from '@/store';
import type { UserStateType } from '@/store/userReducer';

function useGetLocaltUserInfo() {
	const { username, nickname, routerPermissions } =
		useSelector<GlobalReduxStateType>((state) => state.user) as UserStateType;
	return { username, nickname, routerPermissions };
}

export default useGetLocaltUserInfo;

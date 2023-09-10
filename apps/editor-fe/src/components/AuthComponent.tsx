import React, { type ReactElement } from 'react';

import { LOGIN_PATHNAME } from '@/router';
import usePageAuth from '@/hooks/usePageAuth';

type AuthComponentProps = { children: ReactElement; redirectPath?: string };

function AuthComponent({
	children,
	redirectPath = LOGIN_PATHNAME
}: AuthComponentProps) {
	const { canAccept, location, Navigate } = usePageAuth();
	if (!canAccept) {
		return <Navigate to={redirectPath} replace state={{ from: location }} />;
	}
	return children;
}

export default AuthComponent;

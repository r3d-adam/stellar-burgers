import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from './../services/store';
import Loader from './loader';

interface IProtectedRouteElementProps {
	onlyUnAuth?: boolean;
	element: React.ReactElement;
}

export const ProtectedRouteElement: FC<IProtectedRouteElementProps> = ({
	onlyUnAuth = false,
	element,
}) => {
	const { isAuthChecked, user } = useSelector((store) => store.user);
	const location = useLocation();

	if (!isAuthChecked) {
		return <Loader />;
	}

	if (onlyUnAuth && user) {
		const { from } = location.state || { from: { pathname: '/' } };
		return <Navigate to={from} />;
	}

	if (!onlyUnAuth && !user) {
		return <Navigate to={'/login'} state={{ from: location }} />;
	}

	return element;
};

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth: FC<{ element: React.ReactElement }> = ({ element }) => {
	return <ProtectedRouteElement onlyUnAuth={true} element={element} />;
};

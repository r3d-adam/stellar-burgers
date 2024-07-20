import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from './loader';

export const ProtectedRouteElement = ({ onlyUnAuth = false, element }) => {
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
export const OnlyUnAuth = ({ element }) => {
	return <ProtectedRouteElement onlyUnAuth={true} element={element} />;
};

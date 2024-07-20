import { request, checkResponse, setTokens } from './utils';

const BASE_URL = 'https://norma.nomoreparties.space/api';

export const fetchIngredients = () => {
	return request(`${BASE_URL}/ingredients`);
};

export const fetchOrder = (ingredients) => {
	return fetchWithRefresh(`${BASE_URL}/orders`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			'authorization': localStorage.getItem('accessToken'),
		},
		body: JSON.stringify(ingredients),
	});
};

export const refreshToken = () => {
	return request(`${BASE_URL}/auth/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	}).then(setTokens);
};

export const fetchWithRefresh = async (url, options) => {
	try {
		const res = await fetch(url, options);
		return await checkResponse(res);
	} catch (err) {
		console.log('error', err);
		if (err.message === 'jwt expired') {
			const refreshData = await refreshToken();
			options.headers.authorization = refreshData.accessToken;
			const res = await fetch(url, options);
			return await checkResponse(res);
		} else {
			return Promise.reject(err);
		}
	}
};

export const fetchUserData = () => {
	return fetchWithRefresh(`${BASE_URL}/auth/user`, {
		headers: { authorization: localStorage.getItem('accessToken') },
	});
};

export const registerUserRequest = (user) => {
	return request(`${BASE_URL}/auth/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(user),
	}).then(setTokens);
};

export const loginRequest = (user) => {
	return request(`${BASE_URL}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(user),
	}).then(setTokens);
};

export const logoutRequest = () => {
	return request(`${BASE_URL}/auth/logout`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	});
};

export const updateUserRequest = (user) => {
	return fetchWithRefresh(`${BASE_URL}/auth/user`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			'authorization': localStorage.getItem('accessToken'),
		},
		body: JSON.stringify(user),
	});
};

export const forgotPasswordRequest = (email) => {
	return request(`${BASE_URL}/password-reset`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({ email }),
	});
};

export const resetPasswordRequest = ({ newPassword, emailCode }) => {
	return fetchWithRefresh(`${BASE_URL}/password-reset/reset`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({ password: newPassword, token: emailCode }),
	});
};

import { OrderStatus, TIngredient, TOrder } from '../services/types/data';
import { request, checkResponse, setTokens, TServerResponse, TRefreshResponse } from './utils';

export const BASE_URL = 'https://norma.nomoreparties.space/api';



type TIngredientsResponse = TServerResponse<{
	data: TIngredient[];
}>;

export const fetchIngredients = (): Promise<TIngredientsResponse> => {
	return request<TIngredientsResponse>(`${BASE_URL}/ingredients`);
};

type TFetchOrderResponse = TServerResponse<{
	name: string;
	order: {
		ingredients: TIngredient[];
		status: string;
		name: string;
		createdAt: string;
		updatedAt: string;
		number: number;
		price: number;
	};
}>;

export const fetchOrder = (ingredients: { ingredients: string[]}): Promise<TFetchOrderResponse> => {
	return fetchWithRefresh<TFetchOrderResponse>(`${BASE_URL}/orders`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			'authorization': localStorage.getItem('accessToken'),
		},
		body: JSON.stringify(ingredients),
	});
};

export const refreshToken = (): Promise<TRefreshResponse> => {
	return request<TRefreshResponse>(`${BASE_URL}/auth/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	}).then(setTokens<TRefreshResponse>);
};

export const fetchWithRefresh = async <T>(url: RequestInfo, options: any): Promise<T> => {
	try {
		const res = await fetch(url, options);
		return await checkResponse<T>(res);
	} catch (err) {
		console.log('error', err);
		if ((err as { message: string }).message === 'jwt expired') {
			const refreshData = await refreshToken();
			options.headers.authorization = refreshData.accessToken;
			const res = await fetch(url, options);
			return await checkResponse<T>(res);
		} else {
			return Promise.reject(err);
		}
	}
};

type TUserResponse = TServerResponse<
	{
		user: { email: string; name: string };
	} & TRefreshResponse
>;

export const fetchUserData = () => {
	return fetchWithRefresh<TUserResponse>(`${BASE_URL}/auth/user`, {
		headers: { authorization: localStorage.getItem('accessToken') },
	});
};

export type TRegisterUserResponse = TServerResponse<{
	user: TUser;
} & TRefreshResponse>;

export type TUser = {
	email: string;
	name: string;
};

export type TUserWithPassword = TUser & { password: string };

export const registerUserRequest = (user: TUserWithPassword): Promise<TRegisterUserResponse> => {
	return request<TRegisterUserResponse>(`${BASE_URL}/auth/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(user),
	}).then(setTokens<TRegisterUserResponse>);
};

type TLoginResponse = TServerResponse<
	{
		user: TUser;
	} & TRefreshResponse
>;

export const loginRequest = (user: {email: string; password: string}): Promise<TLoginResponse> => {
	return request<TLoginResponse>(`${BASE_URL}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(user),
	}).then(setTokens<TLoginResponse>);
};

export type TLogoutResponse = TServerResponse<{ message: string }>;

export const logoutRequest = (): Promise<TLogoutResponse> => {
	return request<TLogoutResponse>(`${BASE_URL}/auth/logout`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	});
};

type TUpdateUserResponse = TServerResponse<{
	user: TUser;
}>;

export const updateUserRequest = (
	user: TUser & { password?: string },
): Promise<TUpdateUserResponse> => {
	return fetchWithRefresh<TUpdateUserResponse>(`${BASE_URL}/auth/user`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			'authorization': localStorage.getItem('accessToken'),
		},
		body: JSON.stringify(user),
	});
};

type TForgotPasswordResponse = TServerResponse<{ message: string }>;

export const forgotPasswordRequest = (email: string): Promise<TForgotPasswordResponse> => {
	return request<TForgotPasswordResponse>(`${BASE_URL}/password-reset`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({ email }),
	});
};

type TResetPasswordResponse = TServerResponse<{ message: string }>;

export const resetPasswordRequest = ({
	newPassword,
	emailCode,
}: {
	newPassword: string;
	emailCode: string;
}): Promise<TResetPasswordResponse> => {
	return fetchWithRefresh<TResetPasswordResponse>(`${BASE_URL}/password-reset/reset`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({ password: newPassword, token: emailCode }),
	});
};



export type TGetOrderResponse = TServerResponse<{ orders: TOrder[]; total: number; totalToday: number }>;

export const getOrderRequest = (number: number): Promise<TGetOrderResponse> => {
	return request<TGetOrderResponse>(`${BASE_URL}/orders/${number}`);
};
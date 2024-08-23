export const getRandomInt = (min: number, max: number): number =>
	Math.floor(Math.random() * (max - min + 1)) + min;

export const checkResponse = <T>(response: Response): Promise<T> => {
	if (response.ok) {
		return response.json();
	}

	return response.json().then((err) => Promise.reject(err));
};

export type TServerResponse<T> = {
	success: boolean;
} & T;

export type TRefreshResponse = TServerResponse<{
	refreshToken: string;
	accessToken: string;
}>;

export const request = <T>(url: RequestInfo, options?: any): Promise<T> => {
	return fetch(url, options).then(checkResponse<T>);
};


export const setTokens = <T extends TRefreshResponse>(tokenData: T): Promise<T> => {
	if (!tokenData.success) {
		return Promise.reject(tokenData);
	}
	localStorage.setItem('refreshToken', tokenData.refreshToken);
	localStorage.setItem('accessToken', tokenData.accessToken);
	return Promise.resolve(tokenData);
};

export const deleteTokens = () => {
	localStorage.removeItem('accessToken');
	localStorage.removeItem('refreshToken');
};

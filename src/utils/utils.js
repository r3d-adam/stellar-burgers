export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const checkResponse = (response) => {
	if (response.ok) {
		return response.json();
	}

	return response.json().then((err) => Promise.reject(err));
};

export const request = (url, options) => {
	return fetch(url, options).then(checkResponse);
};

export const setTokens = (tokenData) => {
	if (!tokenData.success) {
		return Promise.reject(tokenData);
	}
	localStorage.setItem('refreshToken', tokenData.refreshToken);
	localStorage.setItem('accessToken', tokenData.accessToken);
	return tokenData;
};

export const deleteTokens = () => {
	localStorage.removeItem('accessToken');
	localStorage.removeItem('refreshToken');
};

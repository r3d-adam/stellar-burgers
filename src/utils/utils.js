export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const checkResponse = (response) => {
	if (response.ok) {
		return response.json();
	}
	return Promise.reject(`Ошибка ${response.status}`);
};

export const request = (url, options) => {
	return fetch(url, options).then(checkResponse);
};

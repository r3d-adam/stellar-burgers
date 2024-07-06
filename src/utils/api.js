import { request } from './utils';

const BASE_URL = 'https://norma.nomoreparties.space/api';

export const fetchIngredients = () => {
	return request(`${BASE_URL}/ingredients`);
};

export const fetchOrder = (ingredients) => {
	return request(`${BASE_URL}/orders`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(ingredients),
	});
};

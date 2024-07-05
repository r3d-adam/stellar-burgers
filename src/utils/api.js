const API_URL = 'https://norma.nomoreparties.space/api/ingredients';
const ORDER_API_URL = 'https://norma.nomoreparties.space/api/orders';

export const fetchIngredients = () => {
	return fetch(API_URL)
		.then((res) => {
			if (res.ok) {
				return res.json();
			} else {
				return Promise.reject(res);
			}
		})
		.then((res) => {
			return res.data;
		})
		.catch((e) => {
			console.log(e.message);
			return e.message;
		});
};

export const fetchOrder = (ingredients) => {
	return fetch(ORDER_API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(ingredients),
	})
		.then((res) => {
			if (res.ok) {
				return res;
			} else {
				return Promise.reject(res);
			}
		})
		.then((res) => {
			return res.json();
		})
		.catch((e) => {
			console.log(e.message);
			return e.message;
		});
};

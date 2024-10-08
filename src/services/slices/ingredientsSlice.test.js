import reducer, { getIngredients, initialState } from './ingredientsSlice';

const mockIngredients = [
	{
		_id: '643d69a5c3f7b9001cfa093c',
		name: 'Краторная булка N-200i 123',
		type: 'bun',
		proteins: 80,
		fat: 24,
		carbohydrates: 53,
		calories: 420,
		price: 1255,
		image: 'https://code.s3.yandex.net/react/code/bun-02.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
		__v: 0,
	},
	{
		_id: '643d69a5c3f7b9001cfa0941',
		name: 'Биокотлета из марсианской Магнолии',
		type: 'main',
		proteins: 420,
		fat: 142,
		carbohydrates: 242,
		calories: 4242,
		price: 424,
		image: 'https://code.s3.yandex.net/react/code/meat-01.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
		__v: 0,
	},
	{
		_id: '643d69a5c3f7b9001cfa093e',
		name: 'Филе Люминесцентного тетраодонтимформа',
		type: 'main',
		proteins: 44,
		fat: 26,
		carbohydrates: 85,
		calories: 643,
		price: 988,
		image: 'https://code.s3.yandex.net/react/code/meat-03.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
		__v: 0,
	},
];

describe('ingredients reducer', () => {
	test('should return the initial state', () => {
		expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
	});

	test('should set isLoading to true when getIngredients.pending', () => {
		const state = reducer(undefined, { type: getIngredients.pending });
		const { isLoading } = state;

		expect(isLoading).toBe(true);
	});

	test('should set ingredients when getIngredients.fulfilled and isLoading to false', () => {
		const state = reducer(undefined, {
			type: getIngredients.fulfilled,
			payload: mockIngredients,
		});
		const { isLoading, error, ingredients } = state;

		expect(ingredients).toEqual(mockIngredients);
		expect(isLoading).toBe(false);
		expect(error).toBeNull();
	});

	test('should set error when getIngredients.rejected and isLoading to false', () => {
		const errorMessage = 'unexpected error';
		const state = reducer(undefined, {
			type: getIngredients.rejected,
			error: { message: errorMessage },
		});
		const { isLoading, error } = state;

		expect(isLoading).toBe(false);
		expect(error).toBe(errorMessage);
	});
});

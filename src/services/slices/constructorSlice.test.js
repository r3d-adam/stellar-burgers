import { v4 as uuid } from 'uuid';
import reducer, {
	deleteIngredient,
	addIngredient,
	moveIngredient,
	initialState
} from './constructorSlice';

jest.mock('uuid');

describe('constructor reducer', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	test('should return the initial state', () => {
		expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
	});

	test('should handle a ingredient being added to an empty list', () => {
		uuid.mockReturnValueOnce('test-id');

		const newIngredient = {
			_id: '643d69a5c3f7b9001cfa093c',
			name: 'Краторная булка N-200i',
			type: 'bun',
			proteins: 80,
			fat: 24,
			carbohydrates: 53,
			calories: 420,
			price: 1255,
			image: 'https://code.s3.yandex.net/react/code/bun-02.png',
			image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
			image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
			__v: 0
		};

		expect(
			reducer(
				undefined,
				addIngredient({
					index: 0,
					ingredient: { ...newIngredient, id: 'test-id' }
				})
			)
		).toEqual({
			...initialState,
			bun: {
				_id: '643d69a5c3f7b9001cfa093c',
				name: 'Краторная булка N-200i',
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
				id: 'test-id'
			}
		});
	});

	test('should move ingredient from index 5 to 2', () => {
		uuid.mockReturnValueOnce('test-id');

		const state = {
			bun: {
				_id: '643d69a5c3f7b9001cfa093c',
				name: 'Краторная булка N-200i',
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
				id: '05cb3e0d-557c-4c68-8ff4-5ee5b210e814'
			},
			constructorIngredients: [
				{
					_id: '643d69a5c3f7b9001cfa0943',
					name: 'Соус фирменный Space Sauce',
					type: 'sauce',
					proteins: 50,
					fat: 22,
					carbohydrates: 11,
					calories: 14,
					price: 80,
					image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
					image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
					image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
					__v: 0,
					id: '6fb52524-c162-4772-b2e0-be88e0128965'
				},
				{
					_id: '643d69a5c3f7b9001cfa0945',
					name: 'Соус с шипами Антарианского плоскоходца',
					type: 'sauce',
					proteins: 101,
					fat: 99,
					carbohydrates: 100,
					calories: 100,
					price: 88,
					image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
					image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
					image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
					__v: 0,
					id: '54fd8cd1-18a6-43e7-970d-03f01097e57b'
				},
				{
					_id: '643d69a5c3f7b9001cfa0949',
					name: 'Мини-салат Экзо-Плантаго',
					type: 'main',
					proteins: 1,
					fat: 2,
					carbohydrates: 3,
					calories: 6,
					price: 4400,
					image: 'https://code.s3.yandex.net/react/code/salad.png',
					image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
					image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
					__v: 0,
					id: 'ec499616-0751-46db-bf29-3ae1b761b41b'
				},
				{
					_id: '643d69a5c3f7b9001cfa0940',
					name: 'Говяжий метеорит (отбивная)',
					type: 'main',
					proteins: 800,
					fat: 800,
					carbohydrates: 300,
					calories: 2674,
					price: 3000,
					image: 'https://code.s3.yandex.net/react/code/meat-04.png',
					image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
					image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
					__v: 0,
					id: '2decd930-2f5c-4279-8da9-d7afa9807e02'
				},
				{
					_id: '643d69a5c3f7b9001cfa0947',
					name: 'Плоды Фалленианского дерева',
					type: 'main',
					proteins: 20,
					fat: 5,
					carbohydrates: 55,
					calories: 77,
					price: 874,
					image: 'https://code.s3.yandex.net/react/code/sp_1.png',
					image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
					image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png',
					__v: 0,
					id: 'ff70057b-0284-4885-96fc-155ce3758987'
				},
				{
					_id: '643d69a5c3f7b9001cfa094a',
					name: 'Сыр с астероидной плесенью',
					type: 'main',
					proteins: 84,
					fat: 48,
					carbohydrates: 420,
					calories: 3377,
					price: 4142,
					image: 'https://code.s3.yandex.net/react/code/cheese.png',
					image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
					image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png',
					__v: 0,
					id: '8fa8c5dc-e281-456d-9e06-26af7c4ac123'
				}
			]
		};

		expect(
			reducer(
				state,
				moveIngredient({
					ingredient: {
						_id: '643d69a5c3f7b9001cfa094a',
						name: 'Сыр с астероидной плесенью',
						type: 'main',
						proteins: 84,
						fat: 48,
						carbohydrates: 420,
						calories: 3377,
						price: 4142,
						image: 'https://code.s3.yandex.net/react/code/cheese.png',
						image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
						image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png',
						__v: 0,
						id: '8fa8c5dc-e281-456d-9e06-26af7c4ac123'
					},
					index: 2
				})
			)
		).toEqual({
			bun: {
				_id: '643d69a5c3f7b9001cfa093c',
				name: 'Краторная булка N-200i',
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
				id: '05cb3e0d-557c-4c68-8ff4-5ee5b210e814'
			},
			constructorIngredients: [
				{
					_id: '643d69a5c3f7b9001cfa0943',
					name: 'Соус фирменный Space Sauce',
					type: 'sauce',
					proteins: 50,
					fat: 22,
					carbohydrates: 11,
					calories: 14,
					price: 80,
					image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
					image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
					image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
					__v: 0,
					id: '6fb52524-c162-4772-b2e0-be88e0128965'
				},
				{
					_id: '643d69a5c3f7b9001cfa0945',
					name: 'Соус с шипами Антарианского плоскоходца',
					type: 'sauce',
					proteins: 101,
					fat: 99,
					carbohydrates: 100,
					calories: 100,
					price: 88,
					image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
					image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
					image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
					__v: 0,
					id: '54fd8cd1-18a6-43e7-970d-03f01097e57b'
				},
				{
					_id: '643d69a5c3f7b9001cfa094a',
					name: 'Сыр с астероидной плесенью',
					type: 'main',
					proteins: 84,
					fat: 48,
					carbohydrates: 420,
					calories: 3377,
					price: 4142,
					image: 'https://code.s3.yandex.net/react/code/cheese.png',
					image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
					image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png',
					__v: 0,
					id: '8fa8c5dc-e281-456d-9e06-26af7c4ac123'
				},
				{
					_id: '643d69a5c3f7b9001cfa0949',
					name: 'Мини-салат Экзо-Плантаго',
					type: 'main',
					proteins: 1,
					fat: 2,
					carbohydrates: 3,
					calories: 6,
					price: 4400,
					image: 'https://code.s3.yandex.net/react/code/salad.png',
					image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
					image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
					__v: 0,
					id: 'ec499616-0751-46db-bf29-3ae1b761b41b'
				},
				{
					_id: '643d69a5c3f7b9001cfa0940',
					name: 'Говяжий метеорит (отбивная)',
					type: 'main',
					proteins: 800,
					fat: 800,
					carbohydrates: 300,
					calories: 2674,
					price: 3000,
					image: 'https://code.s3.yandex.net/react/code/meat-04.png',
					image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
					image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
					__v: 0,
					id: '2decd930-2f5c-4279-8da9-d7afa9807e02'
				},
				{
					_id: '643d69a5c3f7b9001cfa0947',
					name: 'Плоды Фалленианского дерева',
					type: 'main',
					proteins: 20,
					fat: 5,
					carbohydrates: 55,
					calories: 77,
					price: 874,
					image: 'https://code.s3.yandex.net/react/code/sp_1.png',
					image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
					image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png',
					__v: 0,
					id: 'ff70057b-0284-4885-96fc-155ce3758987'
				}
			]
		});
	});

	test('should delete ingredient', () => {
		const state = {
			bun: {
				_id: '643d69a5c3f7b9001cfa093c',
				name: 'Краторная булка N-200i',
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
				id: '05cb3e0d-557c-4c68-8ff4-5ee5b210e814'
			},
			constructorIngredients: [
				{
					_id: '643d69a5c3f7b9001cfa0943',
					name: 'Соус фирменный Space Sauce',
					type: 'sauce',
					proteins: 50,
					fat: 22,
					carbohydrates: 11,
					calories: 14,
					price: 80,
					image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
					image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
					image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
					__v: 0,
					id: '6fb52524-c162-4772-b2e0-be88e0128965'
				},
				{
					_id: '643d69a5c3f7b9001cfa0949',
					name: 'Мини-салат Экзо-Плантаго',
					type: 'main',
					proteins: 1,
					fat: 2,
					carbohydrates: 3,
					calories: 6,
					price: 4400,
					image: 'https://code.s3.yandex.net/react/code/salad.png',
					image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
					image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
					__v: 0,
					id: 'ec499616-0751-46db-bf29-3ae1b761b41b'
				}
			]
		};

		expect(reducer(state, deleteIngredient('6fb52524-c162-4772-b2e0-be88e0128965'))).toEqual({
			bun: {
				_id: '643d69a5c3f7b9001cfa093c',
				name: 'Краторная булка N-200i',
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
				id: '05cb3e0d-557c-4c68-8ff4-5ee5b210e814'
			},
			constructorIngredients: [
				{
					_id: '643d69a5c3f7b9001cfa0949',
					name: 'Мини-салат Экзо-Плантаго',
					type: 'main',
					proteins: 1,
					fat: 2,
					carbohydrates: 3,
					calories: 6,
					price: 4400,
					image: 'https://code.s3.yandex.net/react/code/salad.png',
					image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
					image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
					__v: 0,
					id: 'ec499616-0751-46db-bf29-3ae1b761b41b'
				}
			]
		});
	});
});

import reducer, { getOrder, initialState } from './orderSlice';

describe('order reducer', () => {
	test('should return the initial state', () => {
		expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
	});

	test('should set isLoading to true when getOrder.pending', () => {
		const state = reducer(undefined, { type: getOrder.pending });
		const { isLoading } = state;

		expect(isLoading).toBe(true);
	});

	test('should set orderId when getOrder.fulfilled and isLoading to false', () => {
		const state = reducer(undefined, {
			type: getOrder.fulfilled,
			payload: { order: { number: 1234 } },
		});
		const { isLoading, error, orderId } = state;

		expect(orderId).toBe('1234');
		expect(isLoading).toBe(false);
		expect(error).toBeNull();
	});

	test('should set error when getOrder.rejected and isLoading to false', () => {
		const errorMessage = 'unexpected error';
		const state = reducer(undefined, {
			type: getOrder.rejected,
			error: { message: errorMessage },
		});
		const { isLoading, error } = state;

		expect(isLoading).toBe(false);
		expect(error).toBe(errorMessage);
	});
});

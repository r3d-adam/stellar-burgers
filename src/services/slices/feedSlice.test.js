import { v4 as uuid } from 'uuid';
import reducer, {
 wsOpen, wsClose, wsError, initialState, getOrder, wsMessage
} from './feedSlice';
import { getOrderRequest } from '../../utils/api';
import { store } from '../store';

jest.mock('../../utils/api');
// let store;
jest.mock('uuid');

const mockOrders = [
	{
		_id: '66da5390119d45001b504858',
		ingredients: [
			'643d69a5c3f7b9001cfa093d',
			'643d69a5c3f7b9001cfa093d',
			'643d69a5c3f7b9001cfa093e'
		],
		status: 'done',
		name: 'Флюоресцентный люминесцентный бургер',
		createdAt: '2024-09-06T00:57:52.389Z',
		updatedAt: '2024-09-06T00:57:52.886Z',
		number: 52042,
		id: 'test-id1'
	},
	{
		_id: '66da52d8119d45001b504856',
		ingredients: [
			'643d69a5c3f7b9001cfa093c',
			'643d69a5c3f7b9001cfa093c',
			'643d69a5c3f7b9001cfa093f',
			'643d69a5c3f7b9001cfa093e'
		],
		status: 'done',
		name: 'Краторный бессмертный люминесцентный бургер',
		createdAt: '2024-09-06T00:54:48.683Z',
		updatedAt: '2024-09-06T00:54:49.221Z',
		number: 52041,
		id: 'test-id2'
	}
];

describe('feed reducer', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	test('should return the initial state', () => {
		expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
	});

	test('should set isConnected to true after opening websocket', () => {
		expect(reducer(undefined, wsOpen(''))).toEqual({ ...initialState, isConnected: true });
	});

	test('should return the initial state after connection closed', () => {
		expect(reducer(undefined, wsClose())).toEqual(initialState);
	});

	test('should handle wsError', () => {
		expect(reducer(undefined, wsError('error message'))).toEqual({
			...initialState,
			error: 'error message'
		});
	});

	test('should handle wsMessage', () => {
		uuid.mockReturnValueOnce('test-id1');
		uuid.mockReturnValueOnce('test-id2');

		const state = reducer(
			initialState,
			wsMessage({
				total: 3,
				totalToday: 1,
				orders: mockOrders
			})
		);

		expect(state.orders).toEqual(mockOrders);
		expect(state.total).toBe(3);
		expect(state.totalToday).toBe(1);
	});

	it('should handle failed order request (getOrder.rejected)', async () => {
		getOrderRequest.mockRejectedValueOnce(new Error('oder number is invalid'));
		await store.dispatch(getOrder(1234));
		const { isSelectedOrderLoading, error, selectedOrder } = store.getState().feed;
		expect(isSelectedOrderLoading).toBe(false);
		expect(error).toBe('oder number is invalid');
		expect(selectedOrder).toBeNull();
	});

	it('should handle successful order request (getOrder.fulfilled)', async () => {
		getOrderRequest.mockResolvedValueOnce({ orders: mockOrders });
		await store.dispatch(getOrder(52042));
		const { isSelectedOrderLoading, error, selectedOrder } = store.getState().feed;
		expect(isSelectedOrderLoading).toBe(false);
		expect(error).toBeNull();
		expect(selectedOrder).toEqual(mockOrders[0]);
	});
});

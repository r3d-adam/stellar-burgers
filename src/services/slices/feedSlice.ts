import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { getOrderRequest } from '../../utils/api';
import { RootState } from '../store';
import { TOrder } from '../types/data';

export type TFeedState = {
	orders: TOrder[];
	total: number;
	totalToday: number;
	error: null | undefined | string;
	isConnected: boolean;
	selectedOrder: TOrder | null;
	isSelectedOrderLoading: boolean;
};

export const initialState: TFeedState = {
	orders: [],
	total: 0,
	totalToday: 0,
	error: null,
	isConnected: false,
	selectedOrder: null,
	isSelectedOrderLoading: false,
};

export const getOrder = createAsyncThunk<TOrder, number, { rejectValue: string }>(
	'feed/getOrder',
	async (orderNumber, { rejectWithValue, getState }) => {
		const { userOrders } = getState() as RootState;
		let order = userOrders.orders.find((order) => order.number === orderNumber);

		if (order) {
			return order;
		} else {
			try {
				const response = await getOrderRequest(orderNumber);
				if (response.orders.length === 0 || response.orders[0].number !== orderNumber) {
					return rejectWithValue('Order not found');
				}
				return response.orders[0];
			} catch (error: unknown) {
				if (error instanceof Error) {
					return rejectWithValue(error.message);
				} else {
					return rejectWithValue('An unknown error occurred');
				}
			}
		}
	},
);

export const feedSlice = createSlice({
	name: 'feed',
	initialState,
	reducers: {
		wsConnect: (state, action: PayloadAction<string | null>) => {
			console.log(action);
		},
		wsDisconnect: (state, action) => {
			console.log('wsDisconnect', action);
		},
		wsMessage: {
			reducer: (state, action: PayloadAction<any>) => {
				console.log(action);
				state.orders = action.payload.orders;
				state.total = action.payload.total;
				state.totalToday = action.payload.totalToday;
			},
			prepare: ({ orders, total, totalToday }) => {
				const ordersWithId = orders.map((item: TOrder) => ({ ...item, id: uuid() }));
				return {
					payload: {
						total,
						totalToday,
						orders: ordersWithId,
					},
				};
			},
		},
		wsOpen: (state, action) => {
			console.log(action);
			state.isConnected = true;
		},
		wsClose: (state, action) => {
			console.log(action);
			return initialState;
		},
		wsError: (state, action) => {
			console.log(action);
			state.error = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder

			.addCase(getOrder.fulfilled, (state, action: PayloadAction<TOrder>) => {
				state.isSelectedOrderLoading = false;
				state.error = null;
				state.selectedOrder = action.payload;
			})
			.addCase(getOrder.rejected, (state, action) => {
				state.isSelectedOrderLoading = false;
				state.error = action.payload || action.error.message;
			});
	},
});

type TFeedActionCreators = typeof feedSlice.actions;

export type TFeedActions = ReturnType<TFeedActionCreators[keyof TFeedActionCreators]>;

export const { wsConnect, wsDisconnect, wsMessage, wsOpen, wsClose, wsError } = feedSlice.actions;
export default feedSlice.reducer;

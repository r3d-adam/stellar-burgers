import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrder } from '../../utils/api';
import { TIngredient } from '../types/data';

export const initialState: TOrderState = {
	orderId: null,
	error: null,
	isLoading: false,
};

type TOrderState = {
	orderId: string | null;
	error?: string | null | undefined;
	isLoading: boolean;
};

export const getOrder = createAsyncThunk(
	'order/getOrder',
	async (constructorIngredients: TIngredient[], { rejectWithValue }) => {
		try {
			const fetchBody = {
				ingredients: constructorIngredients.map((item: TIngredient) => item._id),
			};

			const response = await fetchOrder(fetchBody);
			return response;
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			} else {
				return rejectWithValue(error);
			}
		}
	},
);

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getOrder.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getOrder.fulfilled, (state, action) => {
			state.isLoading = false;
			const payloadOrderId = action.payload?.order?.number.toString();
			state.orderId = payloadOrderId ? payloadOrderId : null;
		});
		builder.addCase(getOrder.rejected, (state, action): TOrderState => {
			return {
				...initialState,
				isLoading: false,
				error: action.error.message ? action.error.message : action.error.toString(),
			};
		});
	},
});

type TOrderActionCreators = typeof orderSlice.actions;

export type TOrderActions = ReturnType<TOrderActionCreators[keyof TOrderActionCreators]>;

export default orderSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrder } from '../../utils/api';

const initialState = {
	orderId: null,
	error: null,
	isLoading: false,
};

export const getOrder = createAsyncThunk(
	'order/getOrder',
	async (constructorIngredients, { rejectWithValue }) => {
		const fetchBody = {
			ingredients: constructorIngredients.map((item) => item._id),
		};

		const response = await fetchOrder(fetchBody);
		return response;
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
			state.orderId = action.payload.order.number;
		});
		builder.addCase(getOrder.rejected, (state, action) => {
			return {
				...initialState,
				isLoading: false,
				error: action.error,
			};
		});
	},
});

export default orderSlice.reducer;

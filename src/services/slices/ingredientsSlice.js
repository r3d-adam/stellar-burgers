import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchIngredients } from '../../utils/api';

const initialState = {
	ingredients: [],
	error: null,
	isLoading: false,
};

export const getIngredients = createAsyncThunk(
	'ingredients/getIngredients',
	async (data, { rejectWithValue }) => {
		const response = await fetchIngredients();
		return response.data;
	},
);

export const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getIngredients.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getIngredients.fulfilled, (state, action) => {
			state.isLoading = false;
			state.ingredients = action.payload;
		});
		builder.addCase(getIngredients.rejected, (state, action) => {
			return {
				...initialState,
				isLoading: false,
				error: action.error,
			};
		});
	},
});

export const { deleteIngredient, addIngredient } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;

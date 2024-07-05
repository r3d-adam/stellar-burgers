import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchIngredients } from '../../utils/api';

const initialState = {
	ingredients: [],
	error: null,
	isLoading: false,
};

export const getIngredients = createAsyncThunk('ingredients/getIngredients', async () => {
	const response = await fetchIngredients();
	return response;
});

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
			state.isLoading = false;
			state.errors = action.payload;
			state.ingredients = initialState.ingredients;
		});
	},
});

export const { deleteIngredient, addIngredient } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;

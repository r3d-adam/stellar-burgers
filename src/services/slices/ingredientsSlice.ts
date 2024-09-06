import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchIngredients } from '../../utils/api';
import { TIngredient } from '../types/data';
import { PayloadAction } from '@reduxjs/toolkit';

export const initialState: TIngredientsState = {
	ingredients: [],
	error: null,
	isLoading: false,
};

type TIngredientsState = {
	ingredients: TIngredient[];
	error: null | undefined | string;
	isLoading: boolean;
};

export const getIngredients = createAsyncThunk<TIngredient[], void, { rejectValue: string }>(
	'ingredients/getIngredients',
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetchIngredients();
			return response.data;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			} else {
				return rejectWithValue('An unknown error occurred');
			}
		}
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
		builder.addCase(getIngredients.fulfilled, (state, action: PayloadAction<TIngredient[]>) => {
			state.isLoading = false;
			state.ingredients = action.payload;
		});
		builder.addCase(getIngredients.rejected, (state, action): TIngredientsState => {
			return {
				...initialState,
				isLoading: false,
				error: action.payload || action.error.message,
			};
		});
	},
});

type TIngredientsActionCreators = typeof ingredientsSlice.actions;

export type TIngredientsActions = ReturnType<
	TIngredientsActionCreators[keyof TIngredientsActionCreators]
>;

export default ingredientsSlice.reducer;

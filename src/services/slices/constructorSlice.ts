import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { TIngredientWithID } from '../types/data';

type TConstructorState = {
	bun: null | TIngredientWithID;
	constructorIngredients: TIngredientWithID[];
	isDragging: boolean;
};

export const initialState: TConstructorState = {
	bun: null,
	constructorIngredients: [],
	isDragging: false,
};

export const constructorSlice = createSlice({
	name: 'constructor',
	initialState,
	reducers: {
		startDrag: (state) => {
			state.isDragging = true;
		},
		endDrag: (state) => {
			state.isDragging = false;
		},
		deleteIngredient: (state, action: PayloadAction<string>) => {
			console.log(action);
			state.constructorIngredients = state.constructorIngredients.filter(
				(ingredient) => ingredient.id !== action.payload,
			);
		},
		addIngredient: {
			reducer: (
				state,
				action: PayloadAction<{ ingredient: TIngredientWithID; index: number }>,
			) => {
				if (action.payload.ingredient.type === 'bun') {
					state.bun = action.payload.ingredient;
				} else {
					let { index } = action.payload;

					if (index === -1) {
						index = state.constructorIngredients.length;
					}

					state.constructorIngredients = [
						...[...state.constructorIngredients].splice(0, index),
						action.payload.ingredient,
						...[...state.constructorIngredients].splice(index),
					];
				}
			},
			prepare: ({ ingredient, index = 0 }) => ({
				payload: {
					index,
					ingredient: { ...ingredient, id: uuid() },
				},
			}),
		},
		moveIngredient: (
			state,
			action: PayloadAction<{ ingredient: TIngredientWithID; index: number }>,
		) => {
			const newIndex = action.payload.index;

			const filteredItems = [...state.constructorIngredients].filter(
				(item) => action.payload.ingredient.id !== item.id,
			);

			state.constructorIngredients = [
				...[...filteredItems].splice(0, newIndex),
				action.payload.ingredient,
				...[...filteredItems].splice(newIndex),
			];
		},
	},
});

type TConstructorActionCreators = typeof constructorSlice.actions;

export type TConstructorActions = ReturnType<
	TConstructorActionCreators[keyof TConstructorActionCreators]
>;

export const { deleteIngredient, addIngredient, moveIngredient, startDrag, endDrag } =
	constructorSlice.actions;
export default constructorSlice.reducer;

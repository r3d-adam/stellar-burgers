import { configureStore } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredientsSlice';
import constructorSlice from './slices/constructorSlice';
import orderSlice from './slices/orderSlice';
import modalSlice from './slices/modalSlice';

export const store = configureStore({
	reducer: {
		constructorStore: constructorSlice,
		ingredients: ingredientsSlice,
		order: orderSlice,
		modal: modalSlice,
	},
});

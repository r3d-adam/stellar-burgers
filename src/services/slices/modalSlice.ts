import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialState: TModalData = {
	isOpen: false,
	type: null,
	title: null,
};

type TModalData = {
	isOpen: boolean;
	type?: null | string;
	title?: null | string;
};

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (state, action: PayloadAction<Omit<TModalData, 'isOpen'>>) => {
			return {
				...state,
				isOpen: true,
				type: action.payload.type ? action.payload.type : null,
				title: action.payload.title ? action.payload.title : null,
			};
		},
		closeModal: (state) => {
			return {
				...initialState,
				isOpen: false,
			};
		},
	},
});

type TModalActionCreators = typeof modalSlice.actions;

export type TModalActions = ReturnType<TModalActionCreators[keyof TModalActionCreators]>;

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isOpen: false,
	modalType: null,
	modalData: null,
	modalTitle: null,
};

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (state, action) => {
			return {
				...state,
				isOpen: true,
				modalType: action.payload.type,
				modalData: action.payload.data ? action.payload.data : null,
				modalTitle: action.payload.title ? action.payload.title : null,
			};
		},
		closeModal: (state, action) => {
			return {
				...initialState,
				isOpen: false,
			};
		},
	},
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;

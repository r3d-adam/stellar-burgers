import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
	isMobile: boolean;
}

const initialState: UIState = {
	isMobile: false,
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setMobile: (state, action: PayloadAction<boolean>) => {
			state.isMobile = action.payload;
		},
	},
});

export const { setMobile } = uiSlice.actions;
export default uiSlice.reducer;

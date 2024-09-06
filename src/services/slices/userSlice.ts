import { createSlice, createAsyncThunk, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import {
	fetchUserData,
	loginRequest,
	logoutRequest,
	registerUserRequest,
	updateUserRequest,
	forgotPasswordRequest,
	resetPasswordRequest,
	TUserWithPassword,
	TUser,
	TRegisterUserResponse,
	TLogoutResponse,
} from '../../utils/api';
import { deleteTokens } from '../../utils/utils';
import { AppDispatch, RootState } from '../store';

export const initialState: UserState = {
	user: null,
	isAuthChecked: false,
	isLoading: false,
	error: null,
	forgotPasswordSuccess: false,
};

type UserState = {
	user: null | TUser;
	isAuthChecked: boolean;
	isLoading: boolean;
	error: null | undefined | string;
	forgotPasswordSuccess: boolean;
};

const setLoading = (state: UserState) => {
	state.isLoading = true;
	state.error = null;
};

const setFulfilled = (state: UserState) => {
	state.isLoading = false;
	state.error = null;
};

const setError = (state: UserState, action: any) => {
	state.isLoading = false;
	state.error = action.payload || action.error.message;
};

export const getUser = createAsyncThunk('user/getUser', async (_, { rejectWithValue }) => {
	try {
		const response = await fetchUserData();
		return response;
	} catch (error: unknown) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		} else {
			return rejectWithValue('An unknown error occurred');
		}
	}
});

export const registerUser = createAsyncThunk<TRegisterUserResponse, TUserWithPassword>(
	'user/registerUser',
	async (user, { rejectWithValue }) => {
		try {
			const response = await registerUserRequest(user);
			return response;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			} else {
				return rejectWithValue('An unknown error occurred');
			}
		}
	},
);

export const login = createAsyncThunk(
	'user/login',
	async (user: { email: string; password: string }, { rejectWithValue }) => {
		try {
			const response = await loginRequest(user);
			return response;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			} else {
				return rejectWithValue('An unknown error occurred');
			}
		}
	},
);

export const logout = createAsyncThunk<
	TLogoutResponse,
	undefined,
	{
		rejectValue: string;
		state: RootState;
		dispatch: AppDispatch;
	}
>('user/logout', async (_, { rejectWithValue }) => {
	try {
		const response = await logoutRequest();
		deleteTokens();
		return response;
	} catch (error: unknown) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		} else {
			return rejectWithValue('An unknown error occurred');
		}
	}
});

export const updateUser = createAsyncThunk(
	'user/updateUser',
	async (user: TUser | TUserWithPassword, { rejectWithValue }) => {
		try {
			const u: TUser & { password?: string } = { ...user };
			if ('password' in u && u.password && u.password.length === 0) {
				delete u.password;
			}
			const response = await updateUserRequest(u);
			return response;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			} else {
				return rejectWithValue('An unknown error occurred');
			}
		}
	},
);

export const forgotPassword = createAsyncThunk(
	'user/forgotPassword',
	async (email: string, { rejectWithValue }) => {
		try {
			const response = await forgotPasswordRequest(email);
			return response;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			} else {
				return rejectWithValue('An unknown error occurred');
			}
		}
	},
);

export const resetPassword = createAsyncThunk(
	'user/resetPassword',
	async (
		{ newPassword, emailCode }: { newPassword: string; emailCode: string },
		{ rejectWithValue },
	) => {
		try {
			const response = await resetPasswordRequest({ newPassword, emailCode });
			return response;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			} else {
				return rejectWithValue('An unknown error occurred');
			}
		}
	},
);

export const checkUserAuth = createAsyncThunk('user/checkUserAuth', async (_, { dispatch }) => {
	if (localStorage.getItem('accessToken')) {
		fetchUserData()
			.then((res) => dispatch(setUser(res.user)))
			.catch(deleteTokens)
			.finally(() => {
				dispatch(setAuthChecked(true));
			});
	} else {
		dispatch(setAuthChecked(true));
	}
});

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setAuthChecked: (state, action) => {
			state.isAuthChecked = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUser.pending, setLoading)
			.addCase(getUser.fulfilled, (state, action) => {
				setFulfilled(state);
				state.user = action.payload.user;
			})
			.addCase(getUser.rejected, setError)
			.addCase(registerUser.pending, setLoading)
			.addCase(
				registerUser.fulfilled,
				(state, action: PayloadAction<TRegisterUserResponse>) => {
					setFulfilled(state);
					state.isAuthChecked = true;
					state.user = action.payload.user;
				},
			)
			.addCase(registerUser.rejected, setError)
			.addCase(updateUser.pending, setLoading)
			.addCase(updateUser.fulfilled, (state, action) => {
				setFulfilled(state);
				state.user = action.payload.user;
			})
			.addCase(updateUser.rejected, setError)
			.addCase(logout.pending, setLoading)
			.addCase(logout.fulfilled, (state) => {
				setFulfilled(state);
				state.forgotPasswordSuccess = false;
				state.user = null;
			})
			.addCase(logout.rejected, setError)
			.addCase(login.pending, setLoading)
			.addCase(login.fulfilled, (state, action) => {
				setFulfilled(state);
				state.user = action.payload.user;
			})
			.addCase(login.rejected, setError)
			.addCase(forgotPassword.pending, setLoading)
			.addCase(forgotPassword.fulfilled, (state) => {
				setFulfilled(state);
				state.forgotPasswordSuccess = true;
			})
			.addCase(forgotPassword.rejected, setError)
			.addCase(resetPassword.pending, setLoading)
			.addCase(resetPassword.fulfilled, setFulfilled)
			.addCase(resetPassword.rejected, setError);
	},
});

type TUserActionCreators = typeof userSlice.actions;

export type TUserActions = ReturnType<TUserActionCreators[keyof TUserActionCreators]>;

export const { setUser, setAuthChecked } = userSlice.actions;
export default userSlice.reducer;

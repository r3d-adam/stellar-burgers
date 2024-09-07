import reducer, {
	initialState,
	setUser,
	setAuthChecked,
	getUser,
	registerUser,
	login,
	logout,
	forgotPassword,
	resetPassword,
	updateUser,
} from './userSlice';

const mockUser = { name: 'Test User', email: 'test@testmail.com' };

describe('user reducer', () => {
	test('should return the initial state', () => {
		expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
	});

	test('should handle setUser', () => {
		expect(reducer(undefined, setUser(mockUser)).user).toEqual(mockUser);
	});

	test('should handle setAuthChecked', () => {
		const state = reducer(undefined, setAuthChecked(true));
		expect(state.isAuthChecked).toBe(true);
	});

	test('should set isLoading to true when login.pending', () => {
		const state = reducer(undefined, { type: login.pending });
		const { isLoading, error } = state;
		expect(isLoading).toBe(true);
		expect(error).toBeNull();
	});

	test('should set user when login.fulfilled and isLoading to false', () => {
		const state = reducer(undefined, {
			type: login.fulfilled,
			payload: { user: mockUser },
		});
		const { isLoading, error, user } = state;
		expect(isLoading).toBe(false);
		expect(error).toBeNull();
		expect(user).toEqual(mockUser);
	});

	test('should set error when login.rejected and isLoading to false', () => {
		const errorMessage = 'wrong email or password';
		const state = reducer(undefined, {
			type: login.rejected,
			error: { message: errorMessage },
		});
		const { isLoading, error } = state;
		expect(isLoading).toBe(false);
		expect(error).toBe(errorMessage);
	});

	test('should set isLoading to true when getUser.pending', () => {
		const state = reducer(undefined, { type: getUser.pending });
		const { isLoading, error } = state;
		expect(isLoading).toBe(true);
		expect(error).toBeNull();
	});

	test('should set user when getUser.fulfilled and isLoading to false', () => {
		const state = reducer(undefined, {
			type: getUser.fulfilled,
			payload: { user: mockUser },
		});
		const { isLoading, error, user } = state;
		expect(user).toEqual(mockUser);
		expect(isLoading).toBe(false);
		expect(error).toBeNull();
	});

	test('should set error when getUser.rejected and isLoading to false', () => {
		const errorMessage = 'unexpected error';
		const state = reducer(undefined, {
			type: getUser.rejected,
			error: { message: errorMessage },
		});
		const { isLoading, error } = state;
		expect(isLoading).toBe(false);
		expect(error).toBe(errorMessage);
	});

	test('should set isLoading to true when registerUser.pending', () => {
		const state = reducer(undefined, { type: registerUser.pending });
		const { isLoading, error } = state;
		expect(isLoading).toBe(true);
		expect(error).toBeNull();
	});

	test('should set user when registerUser.fulfilled and isLoading to false', () => {
		const state = reducer(undefined, {
			type: registerUser.fulfilled,
			payload: { user: mockUser },
		});
		const { isLoading, error, user, isAuthChecked } = state;
		expect(user).toEqual(mockUser);
		expect(isAuthChecked).toBe(true);
		expect(isLoading).toBe(false);
		expect(error).toBeNull();
	});

	test('should set error when registerUser.rejected and isLoading to false', () => {
		const errorMessage = 'unexpected error';
		const state = reducer(undefined, {
			type: registerUser.rejected,
			error: { message: errorMessage },
		});
		const { isLoading, error } = state;

		expect(isLoading).toBe(false);
		expect(error).toBe(errorMessage);
	});

	test('should set isLoading to true when logout.pending', () => {
		const state = reducer(undefined, { type: logout.pending });
		const { isLoading, error } = state;
		expect(isLoading).toBe(true);
		expect(error).toBeNull();
	});

	test('should clear user when logout.fulfilled and set isLoading to false', () => {
		const state = reducer({ ...initialState, user: mockUser }, { type: logout.fulfilled });
		const { isLoading, error, user } = state;
		expect(user).toBeNull();
		expect(isLoading).toBe(false);
		expect(error).toBeNull();
	});

	test('should set error when logout.rejected and isLoading to false', () => {
		const errorMessage = 'unexpected error';
		const state = reducer(undefined, {
			type: logout.rejected,
			error: { message: errorMessage },
		});
		const { isLoading, error } = state;

		expect(isLoading).toBe(false);
		expect(error).toBe(errorMessage);
	});

	test('should set isLoading to true when forgotPassword.pending', () => {
		const state = reducer(undefined, { type: forgotPassword.pending });
		const { isLoading, error } = state;

		expect(isLoading).toBe(true);
		expect(error).toBeNull();
	});

	test('should set forgotPasswordSuccess when forgotPassword.fulfilled', () => {
		const state = reducer(undefined, { type: forgotPassword.fulfilled });
		const { isLoading, error, forgotPasswordSuccess } = state;
		expect(forgotPasswordSuccess).toBe(true);
		expect(isLoading).toBe(false);
		expect(error).toBeNull();
	});

	test('should set error when forgotPassword.rejected and isLoading to false', () => {
		const errorMessage = 'unexpected error';
		const state = reducer(undefined, {
			type: forgotPassword.rejected,
			error: { message: errorMessage },
		});
		const { isLoading, error } = state;
		expect(isLoading).toBe(false);
		expect(error).toBe(errorMessage);
	});

	test('should set isLoading to true when resetPassword.pending', () => {
		const state = reducer(undefined, { type: resetPassword.pending });
		const { isLoading, error } = state;

		expect(isLoading).toBe(true);
		expect(error).toBeNull();
	});

	test('should set isLoading to false when resetPassword.fulfilled', () => {
		const state = reducer(undefined, { type: resetPassword.fulfilled });
		const { isLoading, error } = state;

		expect(isLoading).toBe(false);
		expect(error).toBeNull();
	});

	test('should set error when resetPassword.rejected and isLoading to false', () => {
		const errorMessage = 'unexpected error';
		const state = reducer(undefined, {
			type: resetPassword.rejected,
			error: { message: errorMessage },
		});
		const { isLoading, error } = state;

		expect(isLoading).toBe(false);
		expect(error).toBe(errorMessage);
	});

	test('should set isLoading to true when updateUser.pending', () => {
		const state = reducer(undefined, { type: updateUser.pending });
		const { isLoading, error } = state;

		expect(isLoading).toBe(true);
		expect(error).toBeNull();
	});

	test('should set user when updateUser.fulfilled and isLoading to false', () => {
		const state = reducer(undefined, {
			type: updateUser.fulfilled,
			payload: { user: mockUser },
		});
		const { isLoading, error, user } = state;

		expect(user).toEqual(mockUser);
		expect(isLoading).toBe(false);
		expect(error).toBeNull();
	});

	test('should set error when updateUser.rejected and isLoading to false', () => {
		const errorMessage = 'unexpected error';
		const state = reducer(undefined, {
			type: updateUser.rejected,
			error: { message: errorMessage },
		});
		const { isLoading, error } = state;

		expect(isLoading).toBe(false);
		expect(error).toBe(errorMessage);
	});
});

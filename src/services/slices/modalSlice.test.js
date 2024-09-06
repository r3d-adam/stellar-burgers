import reducer, { openModal, closeModal, initialState } from './modalSlice';

describe('modal reducer', () => {
	test('should return the initial state', () => {
		expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
	});

	test('should handle openModal', () => {
		const state = reducer(undefined, openModal({ type: 'test-type', title: 'Test Title' }));
		const { isOpen, type, title } = state;
		expect(isOpen).toBe(true);
		expect(type).toBe('test-type');
		expect(title).toBe('Test Title');
	});

	test('should handle openModal without title and type', () => {
		const state = reducer(undefined, openModal({}));
		expect(state).toEqual({ ...initialState, isOpen: true });
	});

	test('should handle closeModal', () => {
		const state = reducer(undefined, closeModal());
		expect(state).toEqual({ ...initialState, isOpen: false });
	});
});

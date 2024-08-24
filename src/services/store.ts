import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import ingredientsSlice, { TIngredientsActions } from './slices/ingredientsSlice';
import constructorSlice, { TConstructorActions } from './slices/constructorSlice';
import orderSlice, { TOrderActions } from './slices/orderSlice';
import modalSlice, { TModalActions } from './slices/modalSlice';
import userSlice, { TUserActions } from './slices/userSlice';
import { combineReducers} from 'redux';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";import feedSlice, {
	wsConnect as feedWsConnect, 
	wsDisconnect as feedWsDisconnect,
	wsOpen as feedWsOpen,
	wsClose as feedWsClose, 
	wsError as feedWsError, 
	wsMessage as feedWsMessage,
	TFeedActions
} from './slices/feedSlice';
import { socketMiddleware } from './middleware/socketMiddleware';
import userOrdersSlice, {
	wsConnect as userOrdersWsConnect, 
	wsDisconnect as userOrdersWsDisconnect,
	wsOpen as userOrdersWsOpen,
	wsClose as userOrdersWsClose, 
	wsError as userOrdersWsError, 
	wsMessage as userOrdersWsMessage,
	TUserOrdersActions
} from './slices/userOrdersSlice';

import type {} from "redux-thunk";
// import type {} from "redux-thunk/extend-redux";



const feedWsActions = {
	wsInit: feedWsConnect,
    wsClose: feedWsDisconnect,
    onOpen: feedWsOpen,
    onClose: feedWsClose,
    onError: feedWsError,
    onMessage: feedWsMessage,
}
const userOrdersWsActions = {
	wsInit: userOrdersWsConnect,
    wsClose: userOrdersWsDisconnect,
    onOpen: userOrdersWsOpen,
    onClose: userOrdersWsClose,
    onError: userOrdersWsError,
    onMessage: userOrdersWsMessage,
}
const middleware = socketMiddleware(feedWsActions);
const middleware2 = socketMiddleware(userOrdersWsActions, true);

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const rootReducer = combineReducers({
		constructorStore: constructorSlice,
		ingredients: ingredientsSlice,
		order: orderSlice,
		modal: modalSlice,
		user: userSlice,
		feed: feedSlice,
		userOrders: userOrdersSlice,
	});

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middleware, middleware2)
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
// type AppDispatch<TReturnType = void> = (
//   action: AppActions | AppThunk<TReturnType>
// ) => TReturnType;

export type AppActions =
	| TOrderActions
	| TFeedActions
	| TUserOrdersActions
	| TIngredientsActions
	| TConstructorActions
	| TUserActions
	| TModalActions;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AppActions
>;
import { useState, useEffect, useMemo, FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getRandomInt } from '../../utils/utils';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import Modal from '../modal/modal';
import { closeModal, openModal } from '../../services/slices/modalSlice';

import {
	Home,
	IngredientPage,
	Error404Page,
	LoginPage,
	RegisterPage,
	ForgotPasswordPage,
	ResetPasswordPage,
	ProfilePage,
	ProfileInfo,
} from '../../pages';
import { OnlyAuth, OnlyUnAuth } from '../protected-route-element';
import { checkUserAuth } from '../../services/slices/userSlice';
import IngredientDetailsModal from '../Ingredient-details-modal';
import FeedPage from '../../pages/feed';
import OrderPage from '../../pages/order';
import OrderDetailsModal, { OrderDetailsSource } from '../order-details-modal';
import UserOrders from '../user-orders/user-orders';
import UserOrderPage from '../../pages/user-order';
import { setMobile } from '../../services/slices/uiSlice';

const App: FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getIngredients());
		dispatch(checkUserAuth());
	}, []);

	useEffect(() => {
		const mql = window.matchMedia('(max-width: 991.9px)');

		const updateMobileState = (e: MediaQueryListEvent) => {
			dispatch(setMobile(e.matches));
		};

		if (mql.matches) {
			dispatch(setMobile(true));
		}

		mql.addEventListener('change', updateMobileState);

		return () => {
			mql.removeEventListener('change', updateMobileState);
		};
	}, [dispatch]);

	const handleIngredientsModalClose = () => {
		dispatch(closeModal());
		navigate(-1);
	};

	const handleOrderDetailsModalClose = () => {
		dispatch(closeModal());
		navigate(-1);
	};

	const { state } = location;

	return (
		<>
			<AppHeader />

			<main className={styles.mainContainer}>
				<Routes location={state?.backgroundLocation || location}>
					<Route path="/" element={<Home />} />
					<Route path="/stellar-burgers" element={<Home />} />
					<Route path="/login" element={<OnlyUnAuth element={<LoginPage />} />} />
					<Route path="/register" element={<OnlyUnAuth element={<RegisterPage />} />} />
					<Route
						path="/forgot-password"
						element={<OnlyUnAuth element={<ForgotPasswordPage />} />}
					/>
					<Route
						path="/reset-password"
						element={<OnlyUnAuth element={<ResetPasswordPage />} />}
					/>
					<Route path="/profile" element={<OnlyAuth element={<ProfilePage />} />}>
						<Route index element={<ProfileInfo />} />
						<Route path="orders" element={<UserOrders />} />
					</Route>
					<Route
						path="/profile/orders/:id"
						element={<OnlyAuth element={<UserOrderPage />} />}
					/>
					<Route path="/ingredients/:id" element={<IngredientPage />} />
					<Route path="/feed" element={<FeedPage />} />
					<Route path="/feed/:id" element={<OrderPage />} />
					<Route path="*" element={<Error404Page />} />
				</Routes>
			</main>

			{state?.backgroundLocation && (
				<Routes>
					<Route
						path="/ingredients/:id"
						element={<IngredientDetailsModal onClose={handleIngredientsModalClose} />}
					/>
					<Route
						path="/feed/:id"
						element={
							// eslint-disable-next-line react/jsx-wrap-multilines
							<OrderDetailsModal
								onClose={handleOrderDetailsModalClose}
								source={OrderDetailsSource.FEED}
							/>
						}
					/>

					<Route
						path="/profile/orders/:id"
						element={
							// eslint-disable-next-line react/jsx-wrap-multilines
							<OnlyAuth
								element={
									// eslint-disable-next-line react/jsx-wrap-multilines
									<OrderDetailsModal
										onClose={handleOrderDetailsModalClose}
										source={OrderDetailsSource.USER}
									/>
								}
							/>
						}
					/>
				</Routes>
			)}
		</>
	);
};

export default App;

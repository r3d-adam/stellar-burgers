import React, { FC, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
// eslint-disable-next-line import/no-extraneous-dependencies
import { TouchBackend } from 'react-dnd-touch-backend';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import styles from './home.module.css';
import { useDispatch, useSelector } from '../services/store';
import Loader from '../components/loader';

import TotalPrice from '../components/total-price/total-price';
import { openModal } from '../services/slices/modalSlice';
import { getOrder } from '../services/slices/orderSlice';

const Home: FC = () => {
	const { ingredients, isLoading, error } = useSelector((store) => store.ingredients);
	const { constructorIngredients, bun, isDragging } = useSelector((store) => {
		return store.constructorStore;
	});
	const { user } = useSelector((store) => store.user);

	const [orderSideActive, setOrderSideActive] = useState(false);
	const isMobile = useSelector((state) => state.ui.isMobile);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleShowOrderClick = () => {
		setOrderSideActive(true);
	};
	const handleHideOrderClick = () => {
		setOrderSideActive(false);
	};

	const handleClick = () => {
		if (bun && constructorIngredients.length > 0) {
			if (user) {
				dispatch(getOrder([bun, ...constructorIngredients, bun]));
				dispatch(openModal({ type: 'ORDER_DETAILS' }));
			} else {
				navigate('/login');
			}
		}
	};

	const bottomSummaryMobile = isMobile && (
		<div className={`${styles.bottomSummaryMobile} pt-4 pb-4 pl-2 pr-2`}>
			<span className={`${styles.totalPriceWrap} mr-10`}>
				<TotalPrice />
			</span>
			{orderSideActive ? (
				<Button
					htmlType="button"
					type="primary"
					size="medium"
					onClick={handleClick}
					disabled={!bun || !constructorIngredients.length}
				>
					Оформить заказ
				</Button>
			) : (
				<Button
					htmlType="button"
					type="primary"
					size="medium"
					onClick={handleShowOrderClick}
				>
					Смотреть заказ
				</Button>
			)}
		</div>
	);

	// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
	const hideOrderSideButton = <span className="btn-close" onClick={handleHideOrderClick} />;
	const orderSideActiveHeader = isMobile && orderSideActive && (
		<div className={`${styles.orderSideHeader}`}>
			<span>Заказ</span>
			{hideOrderSideButton}
		</div>
	);

	return (
		<>
			{isLoading && <Loader />}
			{error && `Произошла ошибка: ${error}`}
			{!isLoading && !error && ingredients.length > 0 && (
				<div className={styles.container}>
					{orderSideActiveHeader}

					<DndProvider
						options={{ enableMouseEvents: true, enableTouchEvents: true }}
						backend={isMobile ? TouchBackend : HTML5Backend}
					>
						{(!isMobile || !orderSideActive) && <BurgerIngredients />}

						{(!isMobile || orderSideActive) && <BurgerConstructor />}
					</DndProvider>
					{bottomSummaryMobile}
				</div>
			)}
		</>
	);
};

export default Home;

import React, { FC, useEffect, useMemo } from 'react';
import IngredientDetails from '../components/burger-ingredients/ingredient-details/ingredient-details';
import { useDispatch, useSelector } from './../services/store';
import { useParams, useLocation } from 'react-router-dom';
import { Oval, RevolvingDot } from 'react-loader-spinner';
import Error404Page from './404';
import Loader from '../components/loader';
import styles from './ingredient.module.css';
import { TIngredient, TIngredientWithID } from '../services/types/data';
import FeedOrderDetails from './../components/feed-order-dedails/feed-order-dedails';
import { getOrder } from '../services/slices/feedSlice';
import { getOrderRequest } from '../utils/api';

const OrderPage: FC = () => {
	const { id } = useParams();

	const { ingredients, isLoading, error } = useSelector((store) => store.ingredients);
	const { orders, isConnected, selectedOrder, isSelectedOrderLoading } = useSelector(
		(store) => store.feed,
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getOrder(Number(id)));
	}, []);

	return (
		<>
			{(isLoading || isSelectedOrderLoading) && <Loader />}
			{error && `Произошла ошибка: ${error}`}
			{!isLoading &&
				!selectedOrder &&
				!error &&
				ingredients.length > 0 &&
				orders.length > 0 && <Error404Page />}
			{!isLoading && !error && ingredients.length > 0 && selectedOrder && (
				<div className={styles.container}>
					<div className={styles.box}>
						<FeedOrderDetails order={selectedOrder} />
					</div>
				</div>
			)}
		</>
	);
};

export default OrderPage;

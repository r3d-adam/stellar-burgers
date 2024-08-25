import React, { FC, ReactNode, useEffect, useMemo } from 'react';
import styles from './feed.module.css';
import { useDispatch, useSelector } from './../services/store';
import Loader from '../components/loader';
import OrderList from './../components/order-list/order-list';
import { wsConnect, wsDisconnect } from '../services/slices/feedSlice';
import { OrderStatus } from '../services/types/data';

const FeedPage: FC = () => {
	const { ingredients, isLoading, error } = useSelector((store) => store.ingredients);
	const { orders, total, totalToday, isConnected } = useSelector((store) => store.feed);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(wsConnect('wss://norma.nomoreparties.space/orders/all'));

		return () => {
			dispatch(wsDisconnect(''));
		};
	}, []);

	const doneOrders = useMemo(() => {
		let result: ReactNode[] = [];
		const o = orders.filter((order) => order.status === OrderStatus.DONE);
		const chunkSize = 10;
		for (let i = 0; i < o.length; i += chunkSize) {
			const chunk = o.slice(i, i + chunkSize);

			result.push(
				<ul className={`${styles.statusList} ${styles.statusListSuccess}`} key={i}>
					{chunk.map((item, i) => (
						<li className="text text_type_digits-default" key={item.number}>
							{item.number}
						</li>
					))}
				</ul>,
			);
		}
		return result;
	}, [orders]);

	const pendingOrders = useMemo(() => {
		let result: ReactNode[] = [];
		const o = orders.filter((order) => order.status === OrderStatus.PENDING);
		const chunkSize = 10;
		for (let i = 0; i < o.length; i += chunkSize) {
			const chunk = o.slice(i, i + chunkSize);

			result.push(
				<ul className={`${styles.statusList}`} key={i}>
					{chunk.map((item, i) => (
						<li className="text text_type_digits-default" key={item.number}>
							{item.number}
						</li>
					))}
				</ul>,
			);
		}
		return result;
	}, [orders]);

	return (
		<>
			{(isLoading || !isConnected) && <Loader />}
			{error && `Произошла ошибка: ${error}`}
			{!isLoading && !error && isConnected && ingredients.length > 0 && orders.length > 0 && (
				<div className={styles.container}>
					<div className={styles.listCol}>
						<div className="text text_type_main-large mb-5 mt-10">Лента заказов</div>
						<div className={styles.listWrapper}>
							<OrderList data={orders} />
						</div>
					</div>
					<div className={styles.infoCol}>
						<div className={`${styles.statusListsWrapper} mb-6`}>
							<div>
								<span
									className={`${styles.statusListName} text text_type_main-medium mb-6`}
								>
									Готовы:
								</span>
								<div className={styles.lists}>{doneOrders}</div>
							</div>
							<div>
								<span
									className={`${styles.statusListName} text text_type_main-medium mb-6`}
								>
									В работе:
								</span>
								<div className={styles.lists}>{pendingOrders}</div>
							</div>
						</div>

						<div className="text text_type_main-medium">Выполнено за все время:</div>
						<div className="text text_type_digits-large mb-15">{total}</div>
						<div className="text text_type_main-medium">Выполнено за сегодня:</div>
						<div className="text text_type_digits-large">{totalToday}</div>
					</div>
				</div>
			)}
		</>
	);
};

export default FeedPage;

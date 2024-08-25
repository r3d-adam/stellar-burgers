import React, { FC, useEffect, useMemo } from 'react';
import styles from './user-orders.module.css';
import { useDispatch, useSelector } from './../../services/store';
import { wsConnect, wsDisconnect } from '../../services/slices/userOrdersSlice';
import Loader from '../loader';
import OrderList from '../order-list/order-list';

const UserOrders: FC = () => {
	const { ingredients, isLoading, error } = useSelector((store) => store.ingredients);

	const { orders, isConnected } = useSelector((store) => store.userOrders);

	const dispatch = useDispatch();
	const token = localStorage.getItem('accessToken')?.split(' ')[1];

	useEffect(() => {
		dispatch(wsConnect(`wss://norma.nomoreparties.space/orders?token=${token}`));

		return () => {
			dispatch(wsDisconnect(''));
		};
	}, []);

	const reverseOrders = useMemo(() => [...orders].reverse(), [orders]);

	return (
		<>
			{(isLoading || !isConnected) && <Loader />}
			{error && `Произошла ошибка: ${error}`}
			{!isLoading && !error && ingredients.length > 0 && orders.length > 0 && (
				<div className={styles.container}>
					<div className={styles.wrapper}>
						<div className={styles.listCol}>
							<OrderList data={reverseOrders} showStatus={true} />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default UserOrders;

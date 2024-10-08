import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './feed.module.css';
import { useDispatch, useSelector } from '../services/store';
import Loader from '../components/loader';
import OrderList from '../components/order-list/order-list';
import { wsConnect, wsDisconnect } from '../services/slices/feedSlice';
import { OrderStatus } from '../services/types/data';

enum TABS {
	ORDERS = 'orders',
	STATS = 'stats',
}

const FeedPage: FC = () => {
	const { ingredients, isLoading, error } = useSelector((store) => store.ingredients);
	const { orders, total, totalToday, isConnected } = useSelector((store) => store.feed);
	const isMobile = useSelector((store) => store.ui.isMobile);
	const [activeTab, setActiveTab] = useState<TABS | null>(TABS.ORDERS);
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

	const handleTabClick = (activeItem: TABS) => {
		setActiveTab(activeItem);
	};

	const mobileTabs = (
		<div className={`${styles.tabs}`}>
			<Tab
				value={TABS.ORDERS}
				active={activeTab === TABS.ORDERS}
				onClick={() => handleTabClick(TABS.ORDERS)}
			>
				Заказы
			</Tab>
			<Tab
				value={TABS.STATS}
				active={activeTab === TABS.STATS}
				onClick={() => handleTabClick(TABS.STATS)}
			>
				Статистика
			</Tab>
		</div>
	);

	return (
		<>
			{(isLoading || !isConnected) && <Loader />}
			{error && `Произошла ошибка: ${error}`}
			{!isLoading && !error && isConnected && ingredients.length > 0 && orders.length > 0 && (
				<div className={styles.container}>
					{isMobile && (
						<>
							<div
								className={`${styles.title} text text_type_main-large mt-4 mb-2 mx-auto`}
							>
								Лента заказов
							</div>
							{mobileTabs}
						</>
					)}
					{(activeTab === TABS.ORDERS || !isMobile) && (
						<div className={styles.listCol}>
							{!isMobile && (
								<div className="text text_type_main-large mb-5 mt-10">
									Лента заказов
								</div>
							)}

							<div className={styles.listWrapper}>
								<OrderList data={orders} />
							</div>
						</div>
					)}
					{(activeTab === TABS.STATS || !isMobile) && (
						<div className={`${styles.infoCol}`}>
							<div className={styles.infoColInner}>
								<div className={`${styles.statusListsWrapper} mb-5`}>
									<div>
										<span
											className={`${styles.statusListName} text text_type_main-medium mb-6`}
										>
											Готовы:
										</span>
										<div className={styles.lists}>
											{!isMobile
												? doneOrders.slice(0, 5)
												: doneOrders.slice(0, 1)}
										</div>
									</div>
									<div>
										<span
											className={`${styles.statusListName} text text_type_main-medium mb-5`}
										>
											В работе:
										</span>
										<div className={styles.lists}>
											{pendingOrders.slice(0, 1)}
										</div>
									</div>
								</div>
								<dl className={`${styles.statList}`}>
									<dt className={`${styles.label} text text_type_main-medium`}>
										Выполнено за все время:
									</dt>
									<dd className="text text_type_digits-large">{total}</dd>
									<dt
										className={`${styles.label} text text_type_main-medium mt-auto`}
									>
										Выполнено за сегодня:
									</dt>
									<dd
										className={`${styles.totalToday} text text_type_digits-large`}
									>
										{totalToday}
									</dd>
								</dl>
							</div>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default FeedPage;

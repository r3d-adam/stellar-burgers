import React, { FC } from 'react';
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-list.module.css';
import CardOrder from './card-order/card-order';
import { TOrder } from '../../services/types/data';

interface IOrderListProps {
	data: TOrder[];
	showStatus?: boolean;
}

const OrderList: FC<IOrderListProps> = ({ data, showStatus }) => {
	return (
		<>
			{data.length > 0 && (
				<ul className={styles.list}>
					{data.map((item) => {
						return (
							<li className={`${styles.item}`} key={item.id}>
								<CardOrder data={item} showStatus={showStatus} />
							</li>
						);
					})}
				</ul>
			)}
		</>
	);
};

export default OrderList;

import React, { FC, ReactNode, useMemo } from 'react';
import doneImagePath from '../../images/done.png';
import styles from './feed-order-dedails.module.css';
import { useSelector } from './../../services/store';
import Loader from '../loader';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

import { OrderStatus, TIngredient, TIngredientWithID, TOrder } from '../../services/types/data';
import { spawn } from 'child_process';

type TFeedOrderDetailsProps = {
	order: TOrder;
};

const FeedOrderDetails: FC<TFeedOrderDetailsProps> = ({ order }) => {
	const { ingredients } = useSelector((store) => {
		return store.ingredients;
	});
	let status;
	if (order.status && order.status === OrderStatus.PENDING) {
		status = <div className="text text_type_main-small mt-3 mb-15">Готовится</div>;
	} else if (order.status === OrderStatus.CREATED) {
		status = <div className="text text_type_main-small mt-3 mb-15">Создан</div>;
	} else if (order.status === OrderStatus.DONE) {
		status = (
			<div className="text text_type_main-small mt-3 mb-15" style={{ color: '#00CCCC' }}>
				Выполнен
			</div>
		);
	} else {
		status = (
			<div className="text text_type_main-small mt-3 mb-15" style={{ color: '#ce3c2a' }}>
				Отменен
			</div>
		);
	}

	let orderData: { ingredientList: ReactNode[]; totalPrice: number } = useMemo(() => {
		const ingredientList: ReactNode[] = [];
		let ingredientsIdList: string[] = [];
		let totalPrice = 0;

		order?.ingredients.forEach((ingredientId: string) => {
			if (!ingredientsIdList.includes(ingredientId)) {
				const ingredientData = ingredients.filter(
					(ingredient: TIngredient) => ingredient._id === ingredientId,
				)[0];

				if (!ingredientData) {
					return null;
				}

				if (ingredientData) {
					let count = order.ingredients.filter(
						(id: string) => id === ingredientId,
					).length;
					ingredientsIdList.push(ingredientId);

					if (
						!ingredientData ||
						!ingredientData.price ||
						!ingredientData.name ||
						!ingredientData.image_mobile
					) {
						return null;
					}

					const { price, name } = ingredientData;
					const image = ingredientData.image_mobile;

					totalPrice += count * price;

					ingredientList.push(
						<>
							<div className={`${styles.ingredientLeft}`}>
								<span className={`${styles.ingredientImageWrap}`}>
									<div>
										<img src={image} alt={name} />
									</div>
								</span>
								<span
									className={`${styles.ingredientName} text text_type_main-small`}
								>
									{name}
								</span>
							</div>
							<span className={`${styles.price}  text text_type_digits-default`}>
								{count > 1 ? `${count} x ${price}` : price}
								&nbsp;
								<CurrencyIcon type="primary" />
							</span>
						</>,
					);
				}
			}
		});

		return {
			ingredientList,
			totalPrice,
		};
	}, [ingredients, order]);

	return (
		<div className={`${styles.content}`}>
			<>
				<div className={`${styles.orderId} text text_type_digits-default mb-10`}>
					#{order.number}
				</div>
				<div className="text text_type_main-medium mb-3">{order.name}</div>
				{status}
				<div className="text text_type_main-medium mb-6">Состав:</div>
				<ul className={`${styles.ingredientList} mb-10 pr-6`}>
					{orderData.ingredientList.map((item: ReactNode, i: number) => (
						<li key={i}>{item}</li>
					))}
				</ul>

				<div className={`${styles.bottom}`}>
					<span className="text text_type_main-default text_color_inactive">
						<FormattedDate date={new Date(order.createdAt)} />
					</span>
					<div className={`${styles.totalPrice}  text text_type_digits-default`}>
						{orderData.totalPrice}&nbsp;
						<CurrencyIcon type="primary" />
					</div>
				</div>
			</>
		</div>
	);
};

export default FeedOrderDetails;

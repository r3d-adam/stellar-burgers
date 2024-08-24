import React, { useMemo, FC, ReactNode } from 'react';
import {
	Counter,
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './card-order.module.css';
import { useDispatch, useSelector } from './../../../services/store';
import { Link, useLocation } from 'react-router-dom';
import { openModal } from '../../../services/slices/modalSlice';
import { OrderStatus, TIngredient, TIngredientWithID, TOrder } from '../../../services/types/data';

interface ICardOrderProps {
	data: TOrder;
	showStatus?: boolean;
}

const CardOrder: FC<ICardOrderProps> = ({ data, showStatus = false }) => {
	const location = useLocation();

	const dispatch = useDispatch();
	const { ingredients } = useSelector((store) => {
		return store.ingredients;
	});

	if (
		!ingredients ||
		ingredients.length === 0 ||
		!data.ingredients ||
		data.ingredients.length === 0
	) {
		return null;
	}

	const ingredientsIdList: string[] = [];
	let totalPrice = 0;
	const imageList: ReactNode[] = [];
	data.ingredients.forEach((ingredientId: string, i) => {
		if (!ingredientsIdList.includes(ingredientId)) {
			const ingredientData = ingredients.filter(
				(ingredient: TIngredient) => ingredient._id === ingredientId,
			)[0];

			if (!ingredientData) {
				return null;
			}

			let count = data.ingredients.filter((id: string) => ingredientId === id).length;
			ingredientsIdList.push(ingredientId);

			if (
				!ingredientData ||
				!ingredientData.price ||
				!ingredientData.name ||
				!ingredientData.type ||
				!ingredientData.image_mobile
			) {
				return null;
			}

			const { price, name, type } = ingredientData;
			const image = ingredientData.image_mobile;

			totalPrice += count * price;

			imageList.unshift(
				<li key={i}>
					<div className={styles.imgWrapper}>
						<img src={image} alt={name} />
						{count > 1 && type !== 'bun' ? (
							<span className={styles.count}>+{count - 1}</span>
						) : null}
					</div>
				</li>,
			);
		}
	});

	let status;
	if (data.status && data.status === OrderStatus.PENDING) {
		status = <div className="text text_type_main-small mt-2">Готовится</div>;
	} else if (data.status === OrderStatus.CREATED) {
		status = <div className="text text_type_main-small mt-2">Создан</div>;
	} else if (data.status === OrderStatus.DONE) {
		status = (
			<div className="text text_type_main-small mt-2" style={{ color: '#00CCCC' }}>
				Выполнен
			</div>
		);
	} else {
		status = (
			<div className="text text_type_main-small mt-2" style={{ color: '#ce3c2a' }}>
				Отменен
			</div>
		);
	}

	return (
		<>
			<Link
				to={`${data.number}`}
				className={`${styles.card} mb-4 p-6`}
				state={{ backgroundLocation: location }}
			>
				<div className={`${styles.top} mb-6`}>
					<span className={`${styles.code} text text_type_digits-default`}>
						#{data.number}
					</span>
					<span
						className={`${styles.time} text text_type_main-default text_color_inactive`}
					>
						<FormattedDate date={new Date(data.createdAt)} />
					</span>
				</div>
				<div className={`${styles.name} text text_type_main-medium`}>{data.name}</div>
				{showStatus && status}
				<div className={`${styles.bottom} mt-6`}>
					<ul className={`${styles.imageList}`}>{imageList}</ul>
					<span className={`${styles.price} text text_type_digits-default`}>
						{totalPrice}&nbsp;
						<CurrencyIcon type="primary" />
					</span>
				</div>
			</Link>
		</>
	);
};

export default CardOrder;

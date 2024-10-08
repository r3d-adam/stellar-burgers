import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useMemo } from 'react';
import { useSelector } from '../../services/store';
import type { TIngredientWithID } from '../../services/types/data';
import styles from './total-price.module.css';

const TotalPrice: FC = () => {
	const { constructorIngredients, bun } = useSelector((store) => {
		return store.constructorStore;
	});

	const totalPrice = useMemo(() => {
		let totalPrice: number = 0;
		totalPrice = bun ? totalPrice + bun.price * 2 : totalPrice;
		totalPrice = constructorIngredients.reduce(
			(acc: number, item: TIngredientWithID) => acc + item.price,
			totalPrice,
		);
		return totalPrice;
	}, [bun, constructorIngredients]);

	return (
		<span className={`${styles.orderTotal} digittext text_type_digits-medium`}>
			{totalPrice} <CurrencyIcon type="primary" />
		</span>
	);
};

export default TotalPrice;

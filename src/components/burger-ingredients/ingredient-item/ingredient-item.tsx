import React, { useMemo, FC } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientItem from './ingredient-item.module.css';
import { useDispatch, useSelector } from './../../../services/store';
import { useDrag } from 'react-dnd';
import { openModal } from '../../../services/slices/modalSlice';
import { Link, useLocation } from 'react-router-dom';
import { TIngredientWithID } from '../../../services/types/data';

interface IIngredientItemProps {
	ingredient: TIngredientWithID;
}

const IngredientItem: FC<IIngredientItemProps> = ({ ingredient }) => {
	const location = useLocation();

	const dispatch = useDispatch();
	const { name, price, image } = ingredient;

	const [, dragRef] = useDrag({
		type: ingredient.type === 'bun' ? 'bun' : 'ingredient',
		item: {
			...ingredient,
		},
	});

	const handleClick = () => {
		dispatch(
			openModal({
				type: 'INGREDIENT_DETAILS',
				title: 'Детали ингридиента',
			}),
		);
	};

	const { constructorIngredients, bun } = useSelector((store) => {
		return store.constructorStore;
	});
	const count = useMemo(() => {
		if (ingredient.type === 'bun') {
			return bun?._id === ingredient._id ? 2 : 0;
		} else {
			return constructorIngredients.reduce(
				(acc: number, item: TIngredientWithID) =>
					item._id === ingredient._id ? ++acc : acc,
				0,
			);
		}
	}, [ingredient, bun, constructorIngredients]);

	return (
		<>
			<Link
				to={`ingredients/${ingredient._id}`}
				className={`${ingredientItem.card} mb-8 pb-6`}
				onClick={handleClick}
				ref={dragRef}
				state={{ backgroundLocation: location }}
			>
				{count ? <Counter count={count} size="default" extraClass="m-1" /> : null}
				<div className={ingredientItem.image}>
					<img src={image} alt={name} />
				</div>
				<div className={`${ingredientItem.price} text text_type_digits-default m-1`}>
					{price} <CurrencyIcon type="primary" />
				</div>
				<div className={`${ingredientItem.name} text text_type_main-default`}>{name}</div>
			</Link>
		</>
	);
};

export default IngredientItem;

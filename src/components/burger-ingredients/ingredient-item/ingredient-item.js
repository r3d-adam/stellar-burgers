import React, { useState, useMemo } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientShape } from '../../../utils/propTypesShapes';
import PropTypes from 'prop-types';
import ingredientItem from './ingredient-item.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { openModal } from '../../../services/slices/modalSlice';

const IngredientItem = ({ ingredient }) => {
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
				data: ingredient,
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
				(acc, item) => (item._id === ingredient._id ? ++acc : acc),
				0,
			);
		}
	}, [ingredient, bun, constructorIngredients]);

	return (
		<>
			<div className={`${ingredientItem.card} mb-8 pb-6`} onClick={handleClick} ref={dragRef}>
				{count ? <Counter count={count} size="default" extraClass="m-1" /> : null}
				<div className={ingredientItem.image}>
					<img src={image} alt={name} />
				</div>
				<div className={`${ingredientItem.price} text text_type_digits-default m-1`}>
					{price} <CurrencyIcon type="primary" />
				</div>
				<div className={`${ingredientItem.name} text text_type_main-default`}>{name}</div>
			</div>
		</>
	);
};

IngredientItem.propTypes = {
	ingredient: ingredientShape.isRequired,
};

export default IngredientItem;

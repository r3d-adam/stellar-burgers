import React, { useState } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientShape } from '../../../utils/propTypesShapes';
import PropTypes from 'prop-types';
import ingredientItem from './ingredient-item.module.css';

import Modal from '../../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

const IngredientItem = ({ ingredient, count }) => {
	const [modalVisible, setModalVisible] = useState(false);

	const { name, price, image } = ingredient;

	const handleClick = () => {
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
	};

	return (
		<>
			<div className={`${ingredientItem.card} mb-8 pb-6`} onClick={handleClick}>
				{count ? <Counter count={count} size="default" extraClass="m-1" /> : null}
				<div className={ingredientItem.image}>
					<img src={image} alt={name} />
				</div>
				<div className={`${ingredientItem.price} text text_type_digits-default m-1`}>
					{price} <CurrencyIcon type="primary" />
				</div>
				<div className={`${ingredientItem.name} text text_type_main-default`}>{name}</div>
			</div>
			{modalVisible && (
				<Modal modalTitle="Детали ингридиента" closeModal={closeModal}>
					<IngredientDetails ingredient={ingredient} />
				</Modal>
			)}
		</>
	);
};

IngredientItem.propTypes = {
	ingredient: ingredientShape.isRequired,
	count: PropTypes.number,
};

export default IngredientItem;

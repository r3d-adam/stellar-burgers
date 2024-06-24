import React, { useState, useRef, useEffect } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { orderListShape, ingredientListShape } from '../../utils/propTypesShapes';
import IngredientsGroup from './ingredients-group/ingredients-group';
import styles from './burger-ingredients.module.css';

const TABS = {
	BUNS: 'buns',
	SAUCES: 'sauces',
	MAINS: 'mains',
};

const BurgerIngredients = (props) => {
	const [activeTab, setActiveTab] = useState();

	const scrollToRef = useRef();

	useEffect(() => {
		scrollToRef.current && scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
	}, [scrollToRef.current, activeTab]);

	const handleTabClick = (activeItem) => {
		setActiveTab(activeItem);
	};

	const buns = React.useMemo(
		() => props.ingredients.filter((ingredient) => ingredient.type === 'bun'),
		[props.ingredients],
	);
	const sauces = React.useMemo(
		() => props.ingredients.filter((ingredient) => ingredient.type === 'sauce'),
		[props.ingredients],
	);
	const mainIngredients = React.useMemo(
		() => props.ingredients.filter((ingredient) => ingredient.type === 'main'),
		[props.ingredients],
	);

	return (
		<div className={styles.wrapper}>
			<span className={`${styles.heading} text text_type_main-large mt-10 mb-5`}>
				Соберите бургер
			</span>

			<div className={`mb-10`} style={{ display: 'flex' }}>
				<Tab
					value={TABS.BUNS}
					active={activeTab === TABS.BUNS}
					onClick={() => handleTabClick(TABS.BUNS)}
				>
					Булки
				</Tab>
				<Tab
					value={TABS.SAUCES}
					active={activeTab === TABS.SAUCES}
					onClick={() => handleTabClick(TABS.SAUCES)}
				>
					Соусы
				</Tab>
				<Tab
					value={TABS.MAINS}
					active={activeTab === TABS.MAINS}
					onClick={() => handleTabClick(TABS.MAINS)}
				>
					Начинки
				</Tab>
			</div>

			<div className={styles.tabContent}>
				<IngredientsGroup
					title="Булки"
					order={props.order}
					ingredients={buns}
					ref={activeTab === TABS.BUNS ? scrollToRef : null}
				/>
				<IngredientsGroup
					title="Соусы"
					order={props.order}
					ingredients={sauces}
					ref={activeTab === TABS.SAUCES ? scrollToRef : null}
				/>
				<IngredientsGroup
					title="Начинки"
					order={props.order}
					ingredients={mainIngredients}
					ref={activeTab === TABS.MAINS ? scrollToRef : null}
				/>
			</div>
		</div>
	);
};

BurgerIngredients.propTypes = {
	order: orderListShape.isRequired,
	ingredients: ingredientListShape.isRequired,
	updateOrder: PropTypes.func.isRequired,
};
export default BurgerIngredients;

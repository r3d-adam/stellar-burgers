import React, { useState, useRef, useEffect } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { orderListShape, ingredientListShape } from '../../utils/propTypesShapes';
import IngredientsGroup from './ingredients-group/ingredients-group';
import styles from './burger-ingredients.module.css';

const BurgerIngredients = (props) => {
	const [activeTab, setActiveTab] = useState();

	const scrollToRef = useRef();

	useEffect(() => {
		scrollToRef.current && scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
	}, [scrollToRef.current, activeTab]);

	const handleTabClick = (activeItem) => {
		setActiveTab(activeItem);
	};

	const plus = (ingredient) => {
		const oldIngredient = props.order.find((item) => item._id === ingredient._id);
		const newIngredient = oldIngredient ? { ...oldIngredient } : { ...ingredient };

		props.updateOrder({
			...newIngredient,
			count: newIngredient?.count ? newIngredient.count + 1 : 1,
		});
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
					value="Булки"
					active={activeTab === 'Булки'}
					onClick={() => handleTabClick('Булки')}
				>
					Булки
				</Tab>
				<Tab
					value="Соусы"
					active={activeTab === 'Соусы'}
					onClick={() => handleTabClick('Соусы')}
				>
					Соусы
				</Tab>
				<Tab
					value="Начинки"
					active={activeTab === 'Начинки'}
					onClick={() => handleTabClick('Начинки')}
				>
					Начинки
				</Tab>
			</div>

			<div className={styles.tabContent}>
				<IngredientsGroup
					title="Булки"
					order={props.order}
					ingredients={buns}
					ref={activeTab === 'Булки' ? scrollToRef : null}
				/>
				<IngredientsGroup
					title="Соусы"
					order={props.order}
					ingredients={sauces}
					ref={activeTab === 'Соусы' ? scrollToRef : null}
				/>
				<IngredientsGroup
					title="Начинки"
					order={props.order}
					ingredients={mainIngredients}
					ref={activeTab === 'Начинки' ? scrollToRef : null}
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

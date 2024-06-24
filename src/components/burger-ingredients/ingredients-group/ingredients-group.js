import React from 'react';
import PropTypes from 'prop-types';
import { orderListShape, ingredientListShape } from '../../../utils/propTypesShapes';
import IngredientItem from '../ingredient-item/ingredient-item';
import styles from './ingredients-group.module.css';

const IngredientsGroup = React.forwardRef((props, ref) => {
	const getIngredientCount = (ingredient) =>
		props.order.find((item) => ingredient._id === item._id)?.count;

	return (
		<>
			<span className={`${styles.tabName} text text_type_main-medium mb-6`} ref={ref}>
				{props.title}
			</span>

			<ul className={styles.list}>
				{props.ingredients.map((ingredient, index) => (
					<li className={styles.listItem} key={ingredient._id}>
						<IngredientItem
							count={getIngredientCount(ingredient)}
							ingredient={ingredient}
						/>
					</li>
				))}
			</ul>
		</>
	);
});

IngredientsGroup.propTypes = {
	order: orderListShape.isRequired,
	ingredients: ingredientListShape.isRequired,
	title: PropTypes.string,
};

export default IngredientsGroup;

import React from 'react';
import PropTypes from 'prop-types';
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
				{props.ingredients
					//.filter((ingredient) => ingredient.type === 'bun')
					.map((ingredient, index) => (
						<li className={styles.listItem} key={ingredient._id}>
							<IngredientItem
								// onClick={() => plus(ingredient)}
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
	order: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			count: PropTypes.number.isRequired,
			price: PropTypes.number.isRequired,
			type: PropTypes.string.isRequired,
			image: PropTypes.string.isRequired,
			proteins: PropTypes.number.isRequired,
			calories: PropTypes.number.isRequired,
			carbohydrates: PropTypes.number.isRequired,
			fat: PropTypes.number.isRequired,
		}),
	).isRequired,
	ingredients: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			price: PropTypes.number.isRequired,
			type: PropTypes.string.isRequired,
			image: PropTypes.string.isRequired,
			proteins: PropTypes.number,
			calories: PropTypes.number,
			carbohydrates: PropTypes.number,
			fat: PropTypes.number,
		}),
	).isRequired,
	title: PropTypes.string,
};

export default IngredientsGroup;

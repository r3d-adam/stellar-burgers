import React from 'react';
import PropTypes from 'prop-types';
import { ingredientListShape } from '../../../utils/propTypesShapes';
import IngredientItem from '../ingredient-item/ingredient-item';
import styles from './ingredients-group.module.css';

const IngredientsGroup = React.forwardRef((props, ref) => {
	return (
		<>
			<span className={`${styles.tabName} text text_type_main-medium mb-6`} ref={ref}>
				{props.title}
			</span>

			<ul className={styles.list}>
				{props.ingredients.map((ingredient, index) => (
					<li className={styles.listItem} key={ingredient._id}>
						<IngredientItem ingredient={ingredient} />
					</li>
				))}
			</ul>
		</>
	);
});

IngredientsGroup.propTypes = {
	ingredients: ingredientListShape.isRequired,
	title: PropTypes.string,
};

export default IngredientsGroup;

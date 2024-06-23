import React from 'react';
import styles from './ingredients-details.module.css';
import PropTypes from 'prop-types';
import { ingredientShape } from '../../../utils/propTypesShapes';

const IngredientDetails = ({ ingredient }) => {
	const { name, price, image, calories, proteins, fat, carbohydrates } = ingredient;

	return (
		<>
			<img className={styles.modalImage} src={ingredient.image_large} alt={name} />
			<span className={`${styles.modalName} text text_type_main-medium mb-8 mt-4`}>
				{name}
			</span>
			<ul className={`${styles.list} text text_type_main-default text_color_inactive`}>
				<li>
					Калории,ккал
					<span className="text text_type_digits-default mt-1">{calories}</span>
				</li>
				<li>
					Белки,&nbsp;г
					<span className="text text_type_digits-default mt-1">{proteins}</span>
				</li>
				<li>
					Жиры,&nbsp;г<span className="text text_type_digits-default mt-1">{fat}</span>
				</li>
				<li>
					Углеводы,&nbsp;г
					<span className="text text_type_digits-default mt-1">{carbohydrates}</span>
				</li>
			</ul>
		</>
	);
};

IngredientDetails.propTypes = {
	ingredient: ingredientShape.isRequired,
};

export default IngredientDetails;

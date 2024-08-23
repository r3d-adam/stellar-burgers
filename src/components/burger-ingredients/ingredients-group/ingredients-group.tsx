import React from 'react';
import IngredientItem from '../ingredient-item/ingredient-item';
import styles from './ingredients-group.module.css';
import { TIngredientWithID } from '../../../services/types/data';

interface IIngredientsGroupProps {
	title?: string;
	ingredients: TIngredientWithID[];
}

type Ref = HTMLSpanElement;

const IngredientsGroup = React.forwardRef<Ref, IIngredientsGroupProps>((props, ref) => {
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

export default IngredientsGroup;

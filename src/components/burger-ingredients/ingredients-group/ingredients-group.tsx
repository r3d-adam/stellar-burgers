import React, { FC } from 'react';
import IngredientItem from '../ingredient-item/ingredient-item';
import styles from './ingredients-group.module.css';
import { TIngredientWithID } from '../../../services/types/data';

interface IIngredientsGroupProps {
	title?: string;
	ingredients: TIngredientWithID[];
}

type Ref = HTMLSpanElement;

const IngredientsGroup = React.memo(
	React.forwardRef<Ref, IIngredientsGroupProps>(function IngredientsGroup(props, ref) {
		const { title, ingredients } = props;

		return (
			<>
				<span className={`${styles.tabName} text text_type_main-medium mb-6`} ref={ref}>
					{title || null}
				</span>

				<ul className={styles.list}>
					{ingredients.map((ingredient) => (
						<li className={styles.listItem} key={ingredient._id}>
							<IngredientItem ingredient={ingredient} />
						</li>
					))}
				</ul>
			</>
		);
	}),
);

export default IngredientsGroup;

import React, { FC, useMemo } from 'react';
import IngredientDetails from '../components/burger-ingredients/ingredient-details/ingredient-details';
import { useDispatch, useSelector } from './../services/store';
import { useParams, useLocation } from 'react-router-dom';
import { Oval, RevolvingDot } from 'react-loader-spinner';
import Error404Page from './404';
import Loader from '../components/loader';
import styles from './ingredient.module.css';
import { TIngredient, TIngredientWithID } from '../services/types/data';

const IngredientPage: FC = () => {
	const { id } = useParams();

	const { ingredients, isLoading, error } = useSelector((store) => store.ingredients);
	const ingredient = useMemo(() => {
		return (ingredients as TIngredientWithID[]).filter(
			(ingredient: TIngredientWithID) => ingredient._id === id,
		)[0];
	}, [ingredients]);

	return (
		<>
			{isLoading && <Loader />}
			{error && `Произошла ошибка: ${error}`}
			{!isLoading && !ingredient && !error && ingredients.length > 0 && <Error404Page />}
			{!isLoading && !error && ingredients.length > 0 && ingredient && (
				<div className={styles.container}>
					<div className={styles.box}>
						<IngredientDetails ingredient={ingredient} />
					</div>
				</div>
			)}
		</>
	);
};

export default IngredientPage;

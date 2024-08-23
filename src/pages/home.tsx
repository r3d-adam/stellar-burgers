import React, { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import styles from './home.module.css';
import { useSelector } from 'react-redux';
import Loader from '../components/loader';

const Home: FC = () => {
	const { ingredients, isLoading, error } = useSelector((store: any) => store.ingredients);

	return (
		<>
			{isLoading && <Loader />}
			{error && `Произошла ошибка: ${error.message}`}
			{!isLoading && !error && ingredients.length && (
				<div className={styles.container}>
					<DndProvider backend={HTML5Backend}>
						<BurgerIngredients />
						<BurgerConstructor />
					</DndProvider>
				</div>
			)}
		</>
	);
};

export default Home;

import React, { useState, useEffect } from 'react';
import { getRandomInt } from '../../utils/utils';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Modal from '../modal/modal';
import { closeModal } from '../../services/slices/modalSlice';

const App = () => {
	const dispatch = useDispatch();
	const { ingredients, isLoading, error } = useSelector((store) => store.ingredients);

	useEffect(() => {
		dispatch(getIngredients());
	}, []);

	const [page, setPage] = useState('Конструктор');

	const handleModalClose = () => {
		dispatch(closeModal());
	};

	return (
		<>
			<Modal onClose={handleModalClose} />
			<AppHeader onMenuClick={setPage} activeMenuItem={page} />
			{page === 'Конструктор' && isLoading && 'Загрузка...'}
			{page === 'Конструктор' && error && `Произошла ошибка: ${error.message}`}
			{page === 'Конструктор' && !isLoading && !error && ingredients.length && (
				<main className={styles.mainContainer}>
					<DndProvider backend={HTML5Backend}>
						<BurgerIngredients />
						<BurgerConstructor />
					</DndProvider>
				</main>
			)}
			{page === 'Личный кабинет' && <span>Пока такой страницы нет :(</span>}
			{page === 'Лента заказов' && <span>Пока такой страницы нет :(</span>}
		</>
	);
};

export default App;

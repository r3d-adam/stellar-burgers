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

// const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

const App = () => {
	// const [state, setState] = useState({
	// 	isLoading: false,
	// 	hasError: false,
	// });
	// const [ingredients, setIngredients] = useState([]);
	const dispatch = useDispatch();
	const { ingredients, isLoading, error } = useSelector((store) => store.ingredients);

	useEffect(() => {
		dispatch(getIngredients());
	}, []);

	// const [order, setOrder] = useState([]);
	const [page, setPage] = useState('Конструктор');

	// useEffect(() => {
	// 	setState({ ...state, hasError: false, isLoading: true });

	// 	fetch(API_URL)
	// 		.then((res) => {
	// 			if (res.ok) {
	// 				return res.json();
	// 			} else {
	// 				return Promise.reject(res);
	// 			}
	// 		})
	// 		.then((data) => {
	// 			setState({ ...state, isLoading: false });
	// 			setIngredients(data.data);
	// 		})
	// 		.catch((e) => {
	// 			console.log(e.message);
	// 			setState({ ...state, hasError: true, isLoading: false });
	// 		});
	// }, []);

	// useEffect(() => {
	// 	generateRandomOrder({});
	// }, [ingredients]);

	// const generateRandomOrder = ({ maxIngredients = 10, chance = 0.2, maxSameIngredient = 2 }) => {
	// 	if (ingredients.length && !order.length) {
	// 		const ingredientsCopy = [...ingredients];

	// 		const bunList = ingredientsCopy.filter((ingredient) => ingredient.type === 'bun');

	// 		const bun = bunList[getRandomInt(0, bunList.length - 1)];
	// 		const order = [{ ...bun, count: 1 }];
	// 		let totalIngredients = 1;

	// 		ingredientsCopy
	// 			.filter((ingredient) => ingredient.type !== 'bun')
	// 			.forEach((item, i) => {
	// 				if (getRandomInt(0, 100) <= chance * 100 && totalIngredients < maxIngredients) {
	// 					let count = getRandomInt(1, maxSameIngredient);
	// 					if (totalIngredients + count > maxIngredients) {
	// 						count = maxIngredients - totalIngredients;
	// 					}
	// 					totalIngredients += count;
	// 					order.push({ ...item, count });
	// 				}
	// 			});

	// 		setOrder(order);
	// 	}
	// };

	// const updateOrder = (ingredient) => {
	// 	const index = order.findIndex((item) => item._id === ingredient._id);

	// 	let newOrder = [...order];

	// 	if (index !== -1) {
	// 		if (ingredient.count <= 0) {
	// 			newOrder.splice(index, 1);
	// 		} else {
	// 			newOrder[index] = {
	// 				...ingredient,
	// 				count: ingredient.type === 'bun' ? 1 : ingredient.count,
	// 			};
	// 		}
	// 	} else {
	// 		if (ingredient.type === 'bun') {
	// 			newOrder = newOrder.filter((item) => item.type !== 'bun');
	// 		}
	// 		newOrder.push({ ...ingredient, count: 1 });
	// 	}

	// 	setOrder(newOrder);
	// };

	return (
		<>
			<Modal />
			<AppHeader onMenuClick={setPage} activeMenuItem={page} />
			{page === 'Конструктор' && isLoading && 'Загрузка...'}
			{page === 'Конструктор' && error && 'Произошла ошибка'}
			{page === 'Конструктор' && !isLoading && !error && ingredients.length && (
				<main className={styles.mainContainer}>
					<DndProvider backend={HTML5Backend}>
						<BurgerIngredients />
						{/* <BurgerIngredients order={order} updateOrder={updateOrder} /> */}
						{/* <BurgerConstructor order={order} updateOrder={updateOrder} /> */}
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

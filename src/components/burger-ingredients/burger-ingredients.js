import React, { useState, useRef, useEffect } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { orderListShape, ingredientListShape } from '../../utils/propTypesShapes';
import IngredientsGroup from './ingredients-group/ingredients-group';
import styles from './burger-ingredients.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addIngredient } from '../../services/slices/constructorSlice';

const TABS = {
	BUNS: 'buns',
	SAUCES: 'sauces',
	MAINS: 'mains',
};

const OFFSET = 50;

const BurgerIngredients = (props) => {
	const dispatch = useDispatch();
	const ingredients = useSelector((store) => store.ingredients.ingredients);
	const [activeTab, setActiveTab] = useState();
	const [isTabClicked, setTabClicked] = useState(false);

	const scrollToRef = useRef();
	const tabContentRef = useRef();
	const mainGroupRef = useRef();
	const saucesGroupRef = useRef();
	const bunsGroupRef = useRef();

	useEffect(() => {
		if (isTabClicked) {
			scrollToRef.current && scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
			setTabClicked(false);
			setActiveTab();
		}
	}, [scrollToRef.current, activeTab, isTabClicked]);

	useEffect(() => {
		tabContentRef.current?.addEventListener('scroll', handleScroll);

		return () => {
			tabContentRef.current?.removeEventListener('scroll', handleScroll);
		};
	}, [tabContentRef]);

	useEffect(() => {
		tabContentRef.current && tabContentRef.current.dispatchEvent(new Event('scroll'));
	}, []);

	const handleScroll = (e) => {
		const mainGroupRect = mainGroupRef.current?.getBoundingClientRect();
		const saucesGroupRect = saucesGroupRef.current?.getBoundingClientRect();
		const bunsGroupRect = bunsGroupRef.current?.getBoundingClientRect();
		const tabContentRect = tabContentRef.current?.getBoundingClientRect();

		if (
			bunsGroupRect.top - OFFSET <= tabContentRect.top &&
			bunsGroupRect.bottom >= tabContentRect.top
		) {
			setActiveTab(TABS.BUNS);
		}
		if (
			saucesGroupRect.top - OFFSET <= tabContentRect.top &&
			saucesGroupRect.bottom >= tabContentRect.top
		) {
			setActiveTab(TABS.SAUCES);
		}
		if (
			mainGroupRect.top - OFFSET <= tabContentRect.top &&
			mainGroupRect.bottom >= tabContentRect.top
		) {
			setActiveTab(TABS.MAINS);
		}
	};

	const handleTabClick = (activeItem) => {
		setActiveTab(activeItem);
		setTabClicked(true);
	};

	const buns = React.useMemo(
		() => ingredients.filter((ingredient) => ingredient.type === 'bun'),
		[ingredients],
	);
	const sauces = React.useMemo(
		() => ingredients.filter((ingredient) => ingredient.type === 'sauce'),
		[ingredients],
	);
	const mainIngredients = React.useMemo(
		() => ingredients.filter((ingredient) => ingredient.type === 'main'),
		[ingredients],
	);

	return (
		<div className={styles.wrapper}>
			<span className={`${styles.heading} text text_type_main-large mt-10 mb-5`}>
				Соберите бургер
			</span>

			<div className={`mb-10 ${styles.tabs}`}>
				<Tab
					value={TABS.BUNS}
					active={activeTab === TABS.BUNS}
					onClick={() => handleTabClick(TABS.BUNS)}
				>
					Булки
				</Tab>
				<Tab
					value={TABS.SAUCES}
					active={activeTab === TABS.SAUCES}
					onClick={() => handleTabClick(TABS.SAUCES)}
				>
					Соусы
				</Tab>
				<Tab
					value={TABS.MAINS}
					active={activeTab === TABS.MAINS}
					onClick={() => handleTabClick(TABS.MAINS)}
				>
					Начинки
				</Tab>
			</div>

			<div className={styles.tabContent} ref={tabContentRef}>
				<div ref={bunsGroupRef}>
					<IngredientsGroup
						title="Булки"
						order={props.order}
						ingredients={buns}
						ref={activeTab === TABS.BUNS ? scrollToRef : null}
					/>
				</div>
				<div ref={saucesGroupRef}>
					<IngredientsGroup
						title="Соусы"
						order={props.order}
						ingredients={sauces}
						ref={activeTab === TABS.SAUCES ? scrollToRef : null}
					/>
				</div>

				<div ref={mainGroupRef}>
					<IngredientsGroup
						title="Начинки"
						order={props.order}
						ingredients={mainIngredients}
						ref={activeTab === TABS.MAINS ? scrollToRef : null}
					/>
				</div>
			</div>
		</div>
	);
};

export default BurgerIngredients;

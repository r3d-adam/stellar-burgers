import React, { useState, useRef, useEffect, FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { orderListShape, ingredientListShape } from '../../utils/propTypesShapes';
import IngredientsGroup from './ingredients-group/ingredients-group';
import styles from './burger-ingredients.module.css';
import { useDispatch, useSelector } from './../../services/store';
import { addIngredient } from '../../services/slices/constructorSlice';
import { TIngredient, TIngredientWithID } from '../../services/types/data';

enum TABS {
	BUNS = 'buns',
	SAUCES = 'sauces',
	MAINS = 'mains',
}

const OFFSET = 50;

const BurgerIngredients: FC = () => {
	const dispatch = useDispatch();
	const ingredients = useSelector((store) => store.ingredients.ingredients);
	const [activeTab, setActiveTab] = useState<TABS | null>(null);
	const [isTabClicked, setTabClicked] = useState<boolean>(false);

	const scrollToRef = useRef<HTMLSpanElement>(null);
	const tabContentRef = useRef<HTMLDivElement>(null);
	const mainGroupRef = useRef<HTMLDivElement>(null);
	const saucesGroupRef = useRef<HTMLDivElement>(null);
	const bunsGroupRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isTabClicked) {
			scrollToRef.current && scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
			setTabClicked(false);
			setActiveTab(null);
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

	const handleScroll = () => {
		const mainGroupRect = mainGroupRef.current?.getBoundingClientRect();
		const saucesGroupRect = saucesGroupRef.current?.getBoundingClientRect();
		const bunsGroupRect = bunsGroupRef.current?.getBoundingClientRect();
		const tabContentRect = tabContentRef.current?.getBoundingClientRect();

		if (!tabContentRect) return;

		if (
			bunsGroupRect &&
			bunsGroupRect.top - OFFSET <= tabContentRect.top &&
			bunsGroupRect.bottom >= tabContentRect.top
		) {
			setActiveTab(TABS.BUNS);
		}
		if (
			saucesGroupRect &&
			saucesGroupRect.top - OFFSET <= tabContentRect.top &&
			saucesGroupRect.bottom >= tabContentRect.top
		) {
			setActiveTab(TABS.SAUCES);
		}
		if (
			mainGroupRect &&
			mainGroupRect.top - OFFSET <= tabContentRect.top &&
			mainGroupRect.bottom >= tabContentRect.top
		) {
			setActiveTab(TABS.MAINS);
		}
	};

	const handleTabClick = (activeItem: TABS) => {
		setActiveTab(activeItem);
		setTabClicked(true);
	};

	const buns = React.useMemo(
		() =>
			(ingredients as TIngredientWithID[]).filter(
				(ingredient: TIngredientWithID) => ingredient.type === 'bun',
			),
		[ingredients],
	);
	const sauces = React.useMemo(
		() =>
			(ingredients as TIngredientWithID[]).filter(
				(ingredient: TIngredientWithID) => ingredient.type === 'sauce',
			),
		[ingredients],
	);
	const mainIngredients = React.useMemo(
		() =>
			(ingredients as TIngredientWithID[]).filter(
				(ingredient: TIngredientWithID) => ingredient.type === 'main',
			),
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
						ingredients={buns}
						ref={activeTab === TABS.BUNS ? scrollToRef : null}
					/>
				</div>
				<div ref={saucesGroupRef}>
					<IngredientsGroup
						title="Соусы"
						ingredients={sauces}
						ref={activeTab === TABS.SAUCES ? scrollToRef : null}
					/>
				</div>

				<div ref={mainGroupRef}>
					<IngredientsGroup
						title="Начинки"
						ingredients={mainIngredients}
						ref={activeTab === TABS.MAINS ? scrollToRef : null}
					/>
				</div>
			</div>
		</div>
	);
};

export default BurgerIngredients;

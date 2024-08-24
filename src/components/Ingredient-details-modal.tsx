import React, { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Modal from './modal/modal';
import { openModal } from '../services/slices/modalSlice';
import { TIngredient, TIngredientWithID } from '../services/types/data';
import IngredientDetails from './burger-ingredients/ingredient-details/ingredient-details';
import { useDispatch, useSelector } from './../services/store';

interface IIngredientDetailsModalProps {
	onClose: () => void;
}

const IngredientDetailsModal: FC<IIngredientDetailsModalProps> = ({ onClose }) => {
	const dispatch = useDispatch();
	const { id } = useParams();

	const { ingredients, isLoading, error } = useSelector((store) => store.ingredients);
	const ingredient = useMemo(() => {
		if (id) {
			return (ingredients as TIngredientWithID[]).filter(
				(ingredient: TIngredientWithID) => ingredient._id === id,
			)[0];
		}
	}, [ingredients, id]);

	useEffect(() => {
		if (id && ingredient) {
			console.log(ingredient);
			dispatch(
				openModal({
					type: 'INGREDIENT_DETAILS',
					title: 'Детали ингридиента',
				}),
			);
		}
	}, [id, ingredient]);

	if (isLoading || error) {
		return null;
	}

	if (ingredient) {
		return (
			<Modal onClose={onClose}>
				<IngredientDetails ingredient={ingredient} />
			</Modal>
		);
	} else return null;
};

export default IngredientDetailsModal;

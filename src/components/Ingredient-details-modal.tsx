import React, { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Modal from './modal/modal';
import { openModal } from '../services/slices/modalSlice';
import { TIngredient } from '../services/types/data';

interface IIngredientDetailsModalProps {
	onClose: () => void;
}

const IngredientDetailsModal: FC<IIngredientDetailsModalProps> = ({ onClose }) => {
	const dispatch = useDispatch();
	const { id } = useParams();

	const { ingredients, isLoading, error } = useSelector((store: any) => store.ingredients);
	const ingredient = useMemo(() => {
		if (id) {
			return (ingredients as TIngredient[]).filter(
				(ingredient: TIngredient) => ingredient._id === id,
			)[0];
		}
	}, [ingredients, id]);

	useEffect(() => {
		if (id && ingredient) {
			console.log(ingredient);
			dispatch(
				openModal({
					type: 'INGREDIENT_DETAILS',
					data: ingredient,
					title: 'Детали ингридиента',
				}),
			);
		}
	}, [id, ingredient]);

	if (isLoading || error) {
		return null;
	}

	return <Modal onClose={onClose} />;
};

export default IngredientDetailsModal;

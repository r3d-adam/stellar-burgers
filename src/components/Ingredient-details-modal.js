import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import Modal from './modal/modal';
import { openModal, closeModal } from '../services/slices/modalSlice';

const IngredientDetailsModal = ({ onClose }) => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const location = useLocation();

	const { ingredients, isLoading, error } = useSelector((store) => store.ingredients);
	const ingredient = useMemo(() => {
		if (id) {
			return ingredients.filter((ingredient) => ingredient._id === id)[0];
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

	return !isLoading && !error && <Modal onClose={onClose} />;
};

export default IngredientDetailsModal;

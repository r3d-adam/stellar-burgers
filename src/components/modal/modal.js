import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal } from './../../services/slices/modalSlice';
import IngredientDetails from '../burger-ingredients/ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

const modalRoot = document.getElementById('react-modals');

const KEYCODE_ESC = 'Escape';

const Modal = () => {
	const dispatch = useDispatch();
	const { isOpen, modalType, modalData, modalTitle } = useSelector((store) => {
		return store.modal;
	});

	const handleKeyPress = (e) => {
		if (e.key === KEYCODE_ESC) {
			dispatch(closeModal());
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', handleKeyPress);

		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, []);

	const modalContent = () => {
		switch (modalType) {
			case 'INGREDIENT_DETAILS':
				return <IngredientDetails ingredient={modalData} />;
			case 'ORDER_DETAILS':
				return <OrderDetails />;
			default:
				return null;
		}
	};

	const modal = isOpen ? (
		<div className={styles.modalContainer}>
			<ModalOverlay />

			<div className={`${styles.modal} p-10 pb-15`}>
				<span className={styles.modalClose} onClick={() => dispatch(closeModal())}></span>
				<span className={`${styles.modalTitle} text text_type_main-large`}>
					{modalTitle}
				</span>
				<div className={styles.modalContent}>{modalContent()}</div>
			</div>
		</div>
	) : null;

	return ReactDOM.createPortal(modal, modalRoot);
};

export default Modal;

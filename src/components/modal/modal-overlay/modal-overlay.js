import React from 'react';
import styles from './modal-overlay.module.css';
import { useDispatch } from 'react-redux';
import { closeModal } from './../../../services/slices/modalSlice';

const ModalOverlay = () => {
	const dispatch = useDispatch();

	return <div className={styles.modalOverlay} onClick={() => dispatch(closeModal())}></div>;
};

export default ModalOverlay;

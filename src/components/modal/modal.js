import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';

const modalRoot = document.getElementById('react-modals');

const KEYCODE_ESC = 'Escape';

const Modal = ({ modalTitle, children, closeModal }) => {
	const handleKeyPress = (e) => {
		if (e.key === KEYCODE_ESC) {
			closeModal();
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', handleKeyPress);

		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, []);

	const modal = (
		<>
			<div className={styles.modalContainer}>
				<ModalOverlay onClick={closeModal} />
				<div className={`${styles.modal} p-10 pb-15`}>
					<span className={styles.modalClose} onClick={closeModal}></span>
					<span className={`${styles.modalTitle} text text_type_main-large`}>
						{modalTitle}
					</span>
					<div className={styles.modalContent}>{children}</div>
				</div>
			</div>
		</>
	);

	return ReactDOM.createPortal(modal, modalRoot);
};

Modal.propTypes = {
	modalTitle: PropTypes.string,
	closeModal: PropTypes.func.isRequired,
	children: PropTypes.node,
};

export default Modal;

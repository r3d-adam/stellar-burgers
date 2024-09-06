import React, { FC, ReactNode, ReactPortal, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';
import { useSelector } from './../../services/store';
const modalRoot = document.getElementById('react-modals') as HTMLElement;

interface ModalProps {
	onClose: () => void;
	children: ReactNode;
}

const KEYCODE_ESC = 'Escape';

const Modal: FC<ModalProps> = ({ onClose, children }): ReactPortal => {
	const { isOpen, title } = useSelector((store) => {
		return store.modal;
	});

	const handleKeyPress = (e: KeyboardEvent) => {
		if (e.key === KEYCODE_ESC) {
			onClose();
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', handleKeyPress);

		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, [onClose]);

	const modal = isOpen ? (
		<div className={styles.modalContainer} data-testid="modal">
			<ModalOverlay onClose={onClose} />

			<div className={`${styles.modal} p-10 pb-15`}>
				<span
					className={styles.modalClose}
					onClick={onClose}
					data-testid="modal-close"
				></span>
				<span className={`${styles.modalTitle} text text_type_main-large`}>{title}</span>
				<div className={styles.modalContent}>{children}</div>
			</div>
		</div>
	) : null;

	return ReactDOM.createPortal(modal, modalRoot);
};

export default Modal;

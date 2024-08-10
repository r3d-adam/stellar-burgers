import React, { FC } from 'react';
import styles from './modal-overlay.module.css';

interface IModalOverlayProps {
	onClose?: () => void;
}

const ModalOverlay: FC<IModalOverlayProps> = ({ onClose }) => {
	return <div className={styles.modalOverlay} onClick={onClose ? onClose : undefined}></div>;
};

export default ModalOverlay;

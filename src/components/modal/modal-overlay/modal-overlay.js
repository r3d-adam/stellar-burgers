import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({ onClose }) => {
	return <div className={styles.modalOverlay} onClick={onClose ? onClose : null}></div>;
};

ModalOverlay.propTypes = {
	onClose: PropTypes.func,
};

export default ModalOverlay;

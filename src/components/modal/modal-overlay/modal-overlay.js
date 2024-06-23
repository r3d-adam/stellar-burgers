import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

const ModalOverlay = ({ onClick }) => {
	return <div className={styles.modalOverlay} onClick={onClick ? onClick : null}></div>;
};

ModalOverlay.propTypes = {
	onClick: PropTypes.func,
};

export default ModalOverlay;

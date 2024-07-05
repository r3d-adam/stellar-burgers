import React, { useEffect, useRef, useState } from 'react';
import styles from './drop-target.module.css';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { addIngredient, moveIngredient } from '../../services/slices/constructorSlice';
import PropTypes from 'prop-types';

const DropTarget = ({ children, id = 0, type = 'default' }) => {
	const dispatch = useDispatch();
	const wrapperRef = useRef();
	const [dropLocation, setDropLocation] = useState(null);
	const constructorIngredients = useSelector(
		(store) => store.constructorStore.constructorIngredients,
	);

	const [{ onHover, canDrop }, dropTarget] = useDrop({
		accept: type === 'bun' ? 'bun' : 'ingredient',
		drop(ingredient, monitor) {
			if (ingredient?.id === id) {
				return;
			}

			if (type === 'bun') {
				dispatch(addIngredient({ ingredient }));
				return;
			}

			let newIndex = constructorIngredients.findIndex((item) => item.id === id);

			const clientY = monitor.getClientOffset().y;
			const wrapperRect = wrapperRef.current.getBoundingClientRect();
			const wrapperYCenter = wrapperRect.top + (wrapperRect.bottom - wrapperRect.top) / 2;

			const currentIndex = constructorIngredients.findIndex(
				(item) => item.id === ingredient?.id,
			);

			if (currentIndex > -1) {
				if (currentIndex < newIndex && newIndex > 0) {
					newIndex--;
				}

				if (clientY > wrapperYCenter && constructorIngredients.length - 1 >= newIndex + 1) {
					newIndex++;
				}

				dispatch(moveIngredient({ ingredient, index: newIndex }));
			} else {
				if (clientY > wrapperYCenter && constructorIngredients.length >= newIndex + 1) {
					newIndex++;
				}
				dispatch(addIngredient({ ingredient, index: newIndex }));
			}
		},
		hover: (ingredient, monitor) => {
			const clientY = monitor.getClientOffset().y;
			const wrapperRect = wrapperRef.current.getBoundingClientRect();
			const wrapperYCenter = wrapperRect.top + (wrapperRect.bottom - wrapperRect.top) / 2;

			if (clientY > wrapperYCenter) {
				setDropLocation('after');
			} else {
				setDropLocation('before');
			}
		},
		collect: (monitor) => ({ onHover: monitor.isOver(), canDrop: monitor.canDrop() }),
	});

	useEffect(() => {
		if (!onHover) {
			setDropLocation(null);
		}
	}, [onHover]);

	return (
		<div className={styles.wrapper} ref={wrapperRef}>
			{type !== 'bun' && dropLocation === 'before' && (
				<span className={`${styles.bar} ${styles.top}`}></span>
			)}
			<div
				ref={dropTarget}
				className={`${styles.innerWrapper} ${type === 'bun' ? styles.innerWrapperBun : ''}`}
			>
				{children}
			</div>
			{type !== 'bun' && dropLocation === 'after' && (
				<span className={`${styles.bar} ${styles.bottom}`}></span>
			)}
		</div>
	);
};

DropTarget.propTypes = {
	type: PropTypes.string,
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default DropTarget;

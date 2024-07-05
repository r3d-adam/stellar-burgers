import React from 'react';
import PropTypes from 'prop-types';
import doneImagePath from '../../../images/done.png';
import styles from './draggable-constructor-element.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteIngredient } from '../../../services/slices/constructorSlice';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';

const DraggableConstructorElement = (ingredient) => {
	const dispatch = useDispatch();
	const { name, price, image, id } = ingredient;
	const [{ onDrag }, dragRef] = useDrag({
		type: 'ingredient',
		item: {
			...ingredient,
			// id: ingredient._id,
		},
		collect: (monitor) => ({
			onDrag: monitor.isDragging(),
		}),
	});

	// const { orderId, isLoading, error } = useSelector((store) => {
	// 	return store.order;
	// });

	return (
		<div ref={dragRef} style={{ opacity: onDrag ? 0.4 : 1 }}>
			<span className={styles.dragBtn}></span>
			<ConstructorElement
				text={name}
				price={price}
				thumbnail={image}
				handleClose={() => dispatch(deleteIngredient(id))}
			/>
		</div>
	);
};

DraggableConstructorElement.propTypes = {
	// orderId: PropTypes.string.isRequired,
};

export default DraggableConstructorElement;
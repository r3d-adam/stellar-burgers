import React from 'react';
import PropTypes from 'prop-types';
import doneImagePath from '../../../images/done.png';
import styles from './draggable-constructor-element.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteIngredient } from '../../../services/slices/constructorSlice';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { ingredientShape } from '../../../utils/propTypesShapes';

const DraggableConstructorElement = (props) => {
	const dispatch = useDispatch();
	const { name, price, image, id } = props;
	const [{ onDrag }, dragRef] = useDrag({
		type: 'ingredient',
		item: {
			...props,
		},
		collect: (monitor) => ({
			onDrag: monitor.isDragging(),
		}),
	});

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
	name: PropTypes.string.isRequired,
	price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	image: PropTypes.string.isRequired,
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default DraggableConstructorElement;

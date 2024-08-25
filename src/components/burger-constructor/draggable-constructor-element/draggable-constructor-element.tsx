import React, { FC } from 'react';
import styles from './draggable-constructor-element.module.css';
import { deleteIngredient } from '../../../services/slices/constructorSlice';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useDispatch } from '../../../services/store';

interface IDraggableConstructorElementProps {
	name: string;
	price: number;
	image: string;
	id: string | number;
}

const DraggableConstructorElement: FC<IDraggableConstructorElementProps> = (props) => {
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
				handleClose={() => dispatch(deleteIngredient(`${id}`))}
			/>
		</div>
	);
};

export default DraggableConstructorElement;

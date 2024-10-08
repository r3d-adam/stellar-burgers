import React, { FC, MouseEvent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragSourceMonitor, useDrag, useDragLayer } from 'react-dnd';
import { shallowEqual } from 'react-redux';
import styles from './draggable-constructor-element.module.css';
import { deleteIngredient } from '../../../services/slices/constructorSlice';
import { useDispatch, useSelector } from '../../../services/store';

interface IDraggableConstructorElementProps {
	name: string;
	price: number;
	image: string;
	id: string | number;
}

const DraggableConstructorElement: FC<IDraggableConstructorElementProps> = React.memo(
	function DraggableConstructorElement(props: IDraggableConstructorElementProps) {
		const { name, price, image, id } = props;
		const constructorIngredients = useSelector(
			(store) => store.constructorStore.constructorIngredients,
			shallowEqual,
		);
		const dispatch = useDispatch();
		// const constructorElementRef = useRef(null);
		const [{ onDrag }, dragMoveRef, dragMovePreviewRef] = useDrag({
			type: 'ingredient',
			item: {
				...props,
			},
			collect: (monitor) => ({
				onDrag: monitor.isDragging(),
			}),
		});

		// const handleDragOver = (e: SyntheticEvent) => {
		// 	if (dragMovePreviewRef && dragMovePreviewRef.) {
		// 		dragMovePreviewRef?.current?.style.display = 'none';
		// 	}
		// };

		return (
			<div className={`${styles.draggableConstructorElement}`}>
				{constructorIngredients.length > 1 && (
					<div ref={dragMoveRef} style={onDrag ? { display: 'none' } : {}}>
						<span className={styles.dragBtn} />
					</div>
				)}

				<div
					ref={dragMovePreviewRef}
					className={`${styles.constructorElementWrap}`}
					// style={onDrag ? { display: 'none' } : {}}
					style={onDrag ? { opacity: 0.4 } : {}}
				>
					<ConstructorElement
						text={name}
						price={price}
						thumbnail={image}
						handleClose={() => dispatch(deleteIngredient(`${id}`))}
					/>
				</div>
			</div>
		);
	},
);

export default DraggableConstructorElement;

/* eslint-disable import/prefer-default-export */
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useCallback, useRef, useState } from 'react';
import { shallowEqual } from 'react-redux';
import withDraggable from '../../hocs/withDraggable';
import { TCollected, TItem } from '../../../services/types/data';
import styles from './draggable-constructor-element.module.css';
import DraggableConstructorElement from './draggable-constructor-element';
import { useDispatch, useSelector } from '../../../services/store';
import { deleteIngredient, endDrag, startDrag } from '../../../services/slices/constructorSlice';

const scrollListSelector = '.scrollable-list';

const SwipeableDraggableElement = React.memo(function SwipeableDraggableElement(
	props: TItem & any,
) {
	const dispatch = useDispatch();
	const isTouching = useRef(false);
	const lastScrollTop = useRef(0);
	// console.log('props.item.id', props.item.id);

	const handleDrag = (collected: TCollected, outerRef: HTMLElement | null) => {
		// console.log('outerRef', outerRef);

		if (!outerRef) return;
		const diff = collected.monitor.getDifferenceFromInitialOffset();
		if (diff && diff.x < 0) {
			outerRef.style.translate = `${diff.x}px 0`;

			if (Math.abs(diff.x) > outerRef.getBoundingClientRect().width * 0.6) {
				// console.log(collected);
				const { id } = collected.monitor.getItem() as TItem;

				dispatch(deleteIngredient(`${id}`));
				document.documentElement.dispatchEvent(new TouchEvent('touchend'));
				isTouching.current = false;
			}
		} else {
			outerRef.style.translate = `0 0`;
		}

		// Прокрутка списка по вертикали (при свайпе вверх/вниз)
		const scrollContainer = document.querySelector(scrollListSelector);
		// console.log(scrollContainer);
		if (scrollContainer && diff && diff.y) {
			console.log(diff.y);

			scrollContainer.scrollTo({
				top: lastScrollTop.current - diff.y,
				// behavior: 'auto',
			});
		}
	};

	const handleDragStart = useCallback(() => {
		isTouching.current = true;
		// Сохраняем текущее значение скролла в начале перетаскивания
		const scrollContainer = document.querySelector(scrollListSelector);
		if (scrollContainer) {
			lastScrollTop.current = scrollContainer.scrollTop;
		}
		dispatch(startDrag());
	}, [dispatch]);

	const handleDragEnd = useCallback(
		(_: any, __: any, outerRef: HTMLElement | null) => {
			if (outerRef) outerRef.style.translate = `0 0`;
			isTouching.current = false;

			dispatch(endDrag());
		},
		[dispatch],
	);

	const DraggableElement = withDraggable({
		item: { id: props.id },
		// ...props,
		onDrag: handleDrag,
		onDragEnd: handleDragEnd,
		onDragStart: handleDragStart,
	})(DraggableConstructorElement);

	return <DraggableElement {...props} />;
});

type TSwipeDeleteBackgroundProps = {
	id: TItem['id'];
} & any;

const SwipeDeleteBackground = React.memo(function SwipeDeleteBackground(
	props: TSwipeDeleteBackgroundProps,
) {
	const isDragging = useSelector((store) => store.constructorStore.isDragging, shallowEqual);
	const visible = isDragging;

	return (
		<>
			{visible && <div className={`${styles.removeBackground}`} />}
			<div>
				<SwipeableDraggableElement {...props} />
			</div>
		</>
	);
});

export default SwipeDeleteBackground;

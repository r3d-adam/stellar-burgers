import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import styles from './drop-target.module.css';
import { useDispatch, useSelector } from '../../services/store';
import { addIngredient, moveIngredient } from '../../services/slices/constructorSlice';
import { TIngredientWithID } from '../../services/types/data';

interface IDropTargetProps {
	type?: 'bun' | 'ingredient';
	id?: string | number;
	children?: ReactNode;
}

const DropTarget: FC<IDropTargetProps> = ({ id = 0, type = 'ingredient', children }) => {
	const dispatch = useDispatch();
	const wrapperRef = useRef<HTMLDivElement>(null);
	const [dropLocation, setDropLocation] = useState<'after' | 'before' | null>(null);
	const [isDropped, setDropped] = useState<boolean>(false);
	const constructorIngredients = useSelector(
		(store) => store.constructorStore.constructorIngredients,
	);

	const [{ onHover }, dropTarget] = useDrop({
		accept: type === 'bun' ? 'bun' : 'ingredient',
		drop(ingredient: TIngredientWithID, monitor: DropTargetMonitor<TIngredientWithID, void>) {
			if (ingredient?.id === id) {
				return;
			}

			if (type === 'bun') {
				dispatch(addIngredient({ ingredient }));
				return;
			}

			let newIndex = constructorIngredients.findIndex(
				(item: TIngredientWithID) => item.id === id,
			);

			const clientY = monitor.getClientOffset()?.y;
			const wrapperRect = wrapperRef.current?.getBoundingClientRect();

			if (!wrapperRect) return;

			const wrapperYCenter = wrapperRect.top + (wrapperRect.bottom - wrapperRect.top) / 2;

			const currentIndex = constructorIngredients.findIndex(
				(item: TIngredientWithID) => item.id === ingredient?.id,
			);

			if (currentIndex > -1) {
				if (currentIndex < newIndex && newIndex > 0) {
					newIndex--;
				}

				if (
					clientY &&
					clientY > wrapperYCenter &&
					constructorIngredients.length - 1 >= newIndex + 1
				) {
					newIndex++;
				}

				dispatch(moveIngredient({ ingredient, index: newIndex }));
			} else {
				if (
					clientY &&
					clientY > wrapperYCenter &&
					constructorIngredients.length >= newIndex + 1
				) {
					newIndex++;
				}

				dispatch(addIngredient({ ingredient, index: newIndex }));
			}
			setDropped(true);

			setDropLocation(null);
			setTimeout(() => {
				setDropped(false);
			}, 0);
		},
		hover: (ingredient: TIngredientWithID, monitor) => {
			if (ingredient?.id === id) {
				return;
			}

			const clientY = monitor.getClientOffset()?.y;

			const wrapperRect = wrapperRef.current?.getBoundingClientRect();

			if (!wrapperRect) return;
			const wrapperYCenter = wrapperRect.top + (wrapperRect.bottom - wrapperRect.top) / 2;

			if (clientY && clientY > wrapperYCenter) {
				setDropLocation('after');
			} else {
				const dropTargetIndex = constructorIngredients.findIndex(
					(item: TIngredientWithID) => item.id === id,
				);
				if (dropTargetIndex === 0) {
					setDropLocation('before');
				}
			}
		},
		collect: (monitor) => ({ onHover: monitor.isOver(), canDrop: monitor.canDrop() }),
	});

	useEffect(() => {
		if (!onHover) {
			setDropLocation(null);
		}
	}, [onHover]);

	let wrapperClassName = styles.wrapper;
	if (dropLocation && type !== 'bun' && constructorIngredients.length > 0) {
		wrapperClassName = ` ${styles.active}`;
		if (dropLocation === 'before') {
			wrapperClassName = ` ${styles.activeBefore}`;
		} else {
			wrapperClassName = ` ${styles.activeAfter}`;
		}
	}
	if (isDropped) {
		wrapperClassName = ` ${styles.afterDrop}`;
	}
	return (
		<div className={wrapperClassName} ref={wrapperRef}>
			{type !== 'bun' && dropLocation === 'before' && (
				<span className={`${styles.bar} ${styles.top}`} />
			)}
			<div
				ref={dropTarget}
				className={`${styles.innerWrapper} ${type === 'bun' ? styles.innerWrapperBun : ''}`}
			>
				{type !== 'bun' && dropLocation && constructorIngredients.length > 0 && (
					<span className={`${styles.dropOverlay}`} />
				)}
				{children}
			</div>
			{/* {type !== 'bun' && dropLocation === 'after' && (
				<span className={`${styles.bar} ${styles.bottom}`} />
			)} */}
		</div>
	);
};

export default DropTarget;

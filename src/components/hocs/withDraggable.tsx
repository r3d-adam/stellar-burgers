/* eslint-disable react/display-name */
import { FC, useCallback, useEffect } from 'react';
import { DragSourceMonitor } from 'react-dnd';
import { useDragHandlers } from '../../hooks/useDragHandlers';
import { TDraggable, TItem } from '../../services/types/data';

const withDraggable =
	({ onDrag, onDragStart, onDragEnd, type = 'withDraggable', item }: TDraggable) =>
	(WrappedComponent: FC<any>) =>
	(props: TItem & any) => {
		// console.log('item.id', item.id);

		const { collected, outerRef, dragElementRef, previewRef, handleDragMove } = useDragHandlers(
			onDrag,
			onDragEnd,
			type,
			item,
		);

		useEffect(() => {
			if (collected.drag) {
				// console.log('handleDragMove:', handleDragMove, typeof handleDragMove);

				document.addEventListener('drag', handleDragMove);
				document.addEventListener('touchmove', handleDragMove);
				onDragStart(collected, outerRef.current);
			} else {
				document.removeEventListener('drag', handleDragMove);
				document.removeEventListener('touchmove', handleDragMove);
			}

			return () => {
				document.removeEventListener('drag', handleDragMove);
				document.removeEventListener('touchmove', handleDragMove);
			};
		}, [collected.drag, onDragStart, handleDragMove]);

		return (
			<div>
				<span ref={previewRef} />
				<div ref={outerRef}>
					<div ref={dragElementRef}>
						<WrappedComponent {...props} />
					</div>
				</div>
			</div>
		);
	};

export default withDraggable;

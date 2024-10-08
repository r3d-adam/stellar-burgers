import { useRef, useCallback } from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import { TDraggable } from '../services/types/data';

export const useDragHandlers = (
	onDrag: TDraggable['onDrag'],
	onDragEnd: TDraggable['onDragEnd'],
	type: string,
	item: { id: string | number } & Record<string, any>,
) => {
	// console.log('useDragHandlers item.id', item.id);
	// console.log('item', item);

	const outerRef = useRef(null);
	const [collected, dragElementRef, previewRef] = useDrag(() => ({
		type,
		item,
		collect: (monitor) => ({
			monitor,
			drag: monitor.isDragging(),
		}),
		end: (item, monitor) => onDragEnd(item, monitor, outerRef.current),
	}));

	const handleDragMove = useCallback(() => {
		// console.log('drag');

		if (collected.drag && outerRef.current) {
			// console.log('before onDrag');

			onDrag(collected, outerRef.current);
		}
	}, [collected.drag, onDrag]);

	return { collected, outerRef, dragElementRef, previewRef, handleDragMove };
};
export default useDragHandlers;

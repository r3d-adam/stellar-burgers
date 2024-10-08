import { DragSourceMonitor } from 'react-dnd/dist/types/monitors';

export type TIngredient = {
	_id: string;
	name: string;
	price: number;
	type: string;
	image: string;
	// eslint-disable-next-line camelcase
	image_large: string;
	// eslint-disable-next-line camelcase
	image_mobile: string;
	proteins: number;
	calories: number;
	carbohydrates: number;
	fat: number;
};

export type TIngredientWithID = TIngredient & { id: string };

export enum OrderStatus {
	DONE = 'done',
	PENDING = 'pending',
	CREATED = 'created',
	CANCELED = 'canceled',
}

export type TOrder = {
	ingredients: string[];
	_id: string;
	status: OrderStatus;
	name: string;
	createdAt: string;
	updatedAt: string;
	number: number;
	id?: string;
};

export type TCollected = { monitor: DragSourceMonitor<{}, unknown> } & Record<string, any>;

export type TDraggable = {
	onDrag: (collected: TCollected, outerRef: HTMLElement | null) => void;
	onDragStart: (collected: TCollected, outerRef: HTMLElement | null) => void;
	onDragEnd: (
		item: Record<string, any>,
		monitor: TCollected['monitor'],
		outerRef: HTMLElement | null,
	) => void;
	type?: string;
	item: { id: string | number } & Record<string, any>;
};

export type TItem = {
	id: string | number;
} & Record<string, any>;

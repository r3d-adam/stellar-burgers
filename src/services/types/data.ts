export type TIngredient = {
	_id: string;
	name: string;
	price: number;
	type: string;
	image: string;
	image_large: string;
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
}

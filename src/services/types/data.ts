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
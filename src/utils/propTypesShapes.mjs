import PropTypes from 'prop-types';

const ingredient = {
	_id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	type: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	image_large: PropTypes.string.isRequired,
	image_mobile: PropTypes.string.isRequired,
	proteins: PropTypes.number.isRequired,
	calories: PropTypes.number.isRequired,
	carbohydrates: PropTypes.number.isRequired,
	fat: PropTypes.number.isRequired,
	id: PropTypes.string,
};

const order = {
	...ingredient,
	count: PropTypes.number.isRequired,
};

export const ingredientShape = PropTypes.shape(ingredient);
export const ingredientListShape = PropTypes.arrayOf(ingredientShape);

export const orderShape = PropTypes.shape(order);
export const orderListShape = PropTypes.arrayOf(orderShape);

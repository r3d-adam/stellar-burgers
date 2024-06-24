import React, { useState } from 'react';
import {
	ConstructorElement,
	CurrencyIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { orderListShape } from '../../utils/propTypesShapes';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

const BurgerConstructor = (props) => {
	const [modalVisible, setModalVisible] = useState(false);

	const handleClick = () => {
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
	};

	const getTotalPrice = () => {
		const order = props.order;

		const total = order.reduce((totalPrice, item) => {
			if (item.type === 'bun') {
				return totalPrice + item.price * 2;
			} else {
				return totalPrice + item.price * item.count;
			}
		}, 0);
		return total;
	};

	const minus = (ingredient) => {
		props.updateOrder({
			...ingredient,
			count: ingredient.count - 1,
		});
	};

	const bun = props.order.filter((item) => item.type === 'bun')[0];

	const mainList = [];
	props.order
		.filter((item) => item.type !== 'bun')
		.forEach((ingredient, index) => {
			const { name, image, price, count, _id } = ingredient;
			for (let i = 0; i < count; i++) {
				mainList.push(
					<li className={styles.listItem} key={_id + `_${i}`}>
						<span className={styles.dragBtn}></span>
						<ConstructorElement
							text={name}
							price={price}
							thumbnail={image}
							handleClose={() => minus(ingredient)}
						/>
					</li>,
				);
			}
		});

	return (
		<div className={styles.wrapper}>
			<div className={styles.constructorIngredients}>
				{bun && (
					<div className={`${styles.constructorElementWrapper} mb-4`}>
						<ConstructorElement
							type="top"
							isLocked={true}
							text={`${bun.name} (верх)`}
							price={bun.price}
							thumbnail={bun.image}
							key={bun._id + '_0'}
						/>
					</div>
				)}

				<ul className={styles.list}>{mainList}</ul>

				{bun && (
					<div className={styles.constructorElementWrapper}>
						<ConstructorElement
							type="bottom"
							isLocked={true}
							text={`${bun.name} (низ)`}
							price={bun.price}
							thumbnail={bun.image}
							key={bun._id + '_1'}
						/>
					</div>
				)}
			</div>
			<div className={`${styles.orderSummary} mt-10`}>
				<span className={`${styles.orderTotal} digittext text_type_digits-medium`}>
					{getTotalPrice()} <CurrencyIcon />
				</span>
				<Button htmlType="button" type="primary" size="medium" onClick={handleClick}>
					Оформить заказ
				</Button>
				{modalVisible && (
					<Modal closeModal={closeModal}>
						<OrderDetails orderId="034536" />
					</Modal>
				)}
			</div>
		</div>
	);
};

BurgerConstructor.propTypes = {
	order: orderListShape.isRequired,
	updateOrder: PropTypes.func.isRequired,
};

export default BurgerConstructor;

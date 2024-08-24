import React, { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Modal from './modal/modal';
import { openModal } from '../services/slices/modalSlice';
import { TIngredient } from '../services/types/data';
import FeedOrderDetails from './feed-order-dedails/feed-order-dedails';
import { getOrder as getOrderFromFeed } from '../services/slices/feedSlice';
import { getOrder as getOrderFromUser } from '../services/slices/userOrdersSlice';
import { useDispatch, useSelector } from './../services/store';

export enum OrderDetailsSource {
	FEED = 'feed',
	USER = 'user',
}

interface IOrderDetailsModalProps {
	onClose: () => void;
	source: OrderDetailsSource;
}

const OrderDetailsModal: FC<IOrderDetailsModalProps> = ({ onClose, source }) => {
	const { id } = useParams();

	const { isLoading, error } = useSelector((store) => store.ingredients);
	const feed = useSelector((store) => store.feed);
	const userOrders = useSelector((store) => store.userOrders);

	const dispatch = useDispatch();

	let getOrder: typeof getOrderFromFeed | typeof getOrderFromUser;
	let selectedOrder: typeof feed.selectedOrder | typeof userOrders.selectedOrder | null = null;
	if (source === OrderDetailsSource.FEED) {
		getOrder = getOrderFromFeed;
		selectedOrder = feed.selectedOrder;
	} else if (source === OrderDetailsSource.USER) {
		getOrder = getOrderFromUser;
		selectedOrder = userOrders.selectedOrder;
	}
	useEffect(() => {
		dispatch(getOrder(Number(id)));
	}, []);
	useEffect(() => {
		if (id) {
			dispatch(getOrder(Number(id)));
		}
	}, []);

	useEffect(() => {
		if (id && selectedOrder) {
			console.log(selectedOrder);
			dispatch(
				openModal({
					type: 'FEED_ORDER_DETAILS',
				}),
			);
		}
	}, [id, selectedOrder]);

	if (isLoading || error) {
		return null;
	}

	if (selectedOrder)
		return (
			<Modal onClose={onClose}>
				<FeedOrderDetails order={selectedOrder} />
			</Modal>
		);

	return null;
};

export default OrderDetailsModal;

import React, { useState } from 'react';
import {
	EmailInput,
	Button,
	PasswordInput,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './profile-info.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../services/slices/userSlice';

const ProfileInfo = () => {
	const { user, isLoading, error } = useSelector((store) => store.user);
	const [state, setState] = useState({
		name: user?.name ? user.name : '',
		email: user?.email ? user.email : '',
		password: '',
	});

	const [isDataChanged, setDataChanged] = useState(false);

	const [formSubmitted, setFormSubmitted] = useState(false);
	const dispatch = useDispatch();

	const onChange = (e) => {
		setDataChanged(true);
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormSubmitted(true);

		const resultAction = await dispatch(updateUser(state));
		if (updateUser.fulfilled.match(resultAction)) {
			setDataChanged(false);
		}
	};

	const handleCancel = (e) => {
		e.preventDefault();
		setState({
			name: user?.name ? user.name : '',
			email: user?.email ? user.email : '',
			password: '',
		});
		setDataChanged(false);
	};

	return (
		<div className={styles.wrapper}>
			<form>
				<Input
					onChange={onChange}
					value={state.name}
					name={'name'}
					placeholder={'Имя'}
					icon="EditIcon"
				/>
				<EmailInput
					onChange={onChange}
					value={state.email}
					name={'email'}
					isIcon={false}
					placeholder={'Логин'}
					extraClass="mt-6 mb-6"
					icon="EditIcon"
				/>
				<PasswordInput
					onChange={onChange}
					value={state.password}
					name={'password'}
					placeholder={'Пароль'}
					icon="EditIcon"
				/>
				{isDataChanged && (
					<div className={styles.buttonGroup}>
						<Button htmlType="reset" onClick={handleCancel} extraClass={'mt-6'}>
							Отменить
						</Button>
						<Button htmlType="button" onClick={handleSubmit} extraClass={'mt-6'}>
							Сохранить
						</Button>
					</div>
				)}
				{formSubmitted && !isLoading && error && (
					<p className="text text_type_main-default mb-6 mt-6">{`Ошибка: ${error}`}</p>
				)}
			</form>
		</div>
	);
};

export default ProfileInfo;

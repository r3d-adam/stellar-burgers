import React, { FC, useState } from 'react';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import styles from './reset-password.module.css';
import { resetPasswordRequest } from '../utils/api';
import { useDispatch, useSelector } from './../services/store';
import { resetPassword } from '../services/slices/userSlice';

const ResetPasswordPage: FC = () => {
	const [formState, setFormState] = useState({
		newPassword: '',
		emailCode: '',
	});
	const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
	const { isLoading, error, forgotPasswordSuccess } = useSelector((store) => store.user);
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormState({
			...formState,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setFormSubmitted(true);

		const resultAction = await dispatch(resetPassword(formState));
		if (resetPassword.fulfilled.match(resultAction)) {
			navigate('/login', { replace: true });
		}
	};

	if (!forgotPasswordSuccess) {
		return <Navigate to="/forgot-password" replace />;
	}

	return (
		<div className={styles.wrapper}>
			<form onSubmit={handleSubmit}>
				<p className="text text_type_main-medium mb-6">Восстановление пароля</p>
				<PasswordInput
					onChange={onChange}
					value={formState.newPassword}
					name={'newPassword'}
					placeholder={'Введите новый пароль'}
					required
				/>
				{/* @ts-ignore */}
				<Input
					onChange={onChange}
					value={formState.emailCode}
					name={'emailCode'}
					placeholder={'Введите код из письма'}
					extraClass="mt-6"
					required
				/>
				<Button htmlType="submit" extraClass={'mt-6'}>
					Сохранить
				</Button>
				{formSubmitted && !isLoading && error && (
					<p className="text text_type_main-default mb-6 mt-6">{`Ошибка: ${error}`}</p>
				)}
				<p className="text text_type_main-small text_color_inactive mt-20">
					Вспомнили пароль?&ensp;
					<Link to={'/login'} className={styles.link}>
						Войти
					</Link>
				</p>
			</form>
		</div>
	);
};

export default ResetPasswordPage;

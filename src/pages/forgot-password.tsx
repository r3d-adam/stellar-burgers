import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import styles from './forgot-password.module.css';
import { useDispatch, useSelector } from './../services/store';
import { forgotPassword } from '../services/slices/userSlice';

const ForgotPasswordPage: FC = () => {
	const [email, setEmail] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isLoading, error, forgotPasswordSuccess } = useSelector((store) => store.user);
	const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setEmail(e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setFormSubmitted(true);

		const resultAction = await dispatch(forgotPassword(email));
		if (forgotPassword.fulfilled.match(resultAction)) {
			navigate('/reset-password', { replace: true });
		}
	};

	return (
		<div className={styles.wrapper}>
			<form onSubmit={handleSubmit}>
				<p className="text text_type_main-medium mb-6">Восстановление пароля</p>
				<EmailInput
					onChange={onChange}
					value={email}
					name={'email'}
					isIcon={false}
					placeholder={'Укажите e-mail'}
					required
				/>
				<Button htmlType="submit" extraClass={'mt-6'}>
					Восстановить
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

export default ForgotPasswordPage;

import React, { FC, useState } from 'react';
import {
	EmailInput,
	Button,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './login.module.css';
import { login } from '../services/slices/userSlice';
import { useDispatch, useSelector } from './../services/store';

interface ILoginFormState {
	email: string;
	password: string;
}

const LoginPage: FC = () => {
	const [state, setState] = useState<ILoginFormState>({
		email: '',
		password: '',
	});

	const { isLoading, error } = useSelector((store) => store.user);
	const [formSubmitted, setFormSubmitted] = useState(false);

	const dispatch = useDispatch();

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormSubmitted(true);
		dispatch(login(state));
	};

	return (
		<div className={styles.wrapper}>
			<form onSubmit={handleSubmit}>
				<p className="text text_type_main-medium mb-6">Вход</p>
				<EmailInput
					onChange={onChange}
					value={state.email}
					name={'email'}
					isIcon={false}
					placeholder={'Укажите e-mail'}
					required
				/>
				<PasswordInput
					onChange={onChange}
					value={state.password}
					name={'password'}
					extraClass="mt-6"
					placeholder={'Пароль'}
					required
				/>

				<Button htmlType="submit" extraClass={'mt-6'}>
					Войти
				</Button>
				{formSubmitted && !isLoading && error && (
					<p className="text text_type_main-default mb-6 mt-6">{`Ошибка: ${error}`}</p>
				)}
				<p className="text text_type_main-small text_color_inactive mb-2 mt-20">
					Вы — новый пользователь?&ensp;
					<Link to={'/register'} className={styles.link}>
						Зарегистрироваться
					</Link>
				</p>
				<p className="text text_type_main-small text_color_inactive">
					Забыли пароль?&ensp;
					<Link to={'/forgot-password'} className={styles.link}>
						Восстановить пароль
					</Link>
				</p>
			</form>
		</div>
	);
};

export default LoginPage;

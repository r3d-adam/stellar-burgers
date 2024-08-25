import React, { FC, useState } from 'react';
import {
	EmailInput,
	Button,
	PasswordInput,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './register.module.css';
import { useDispatch, useSelector } from './../services/store';
import { registerUser } from '../services/slices/userSlice';

interface IRegisterPageFrom {
	name: string;
	email: string;
	password: string;
}

const RegisterPage: FC = () => {
	const [state, setState] = useState<IRegisterPageFrom>({
		name: '',
		email: '',
		password: '',
	});
	const { isLoading, error } = useSelector((store) => store.user);
	const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

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
		dispatch(registerUser(state));
	};

	return (
		<div className={styles.wrapper}>
			<form onSubmit={handleSubmit}>
				<p className="text text_type_main-medium mb-6">Регистрация</p>
				{/* @ts-ignore */}
				<Input
					onChange={onChange}
					value={state.name}
					name={'name'}
					placeholder={'Имя'}
					required
				/>
				<EmailInput
					onChange={onChange}
					value={state.email}
					name={'email'}
					isIcon={false}
					placeholder={'E-mail'}
					extraClass="mt-6 mb-6"
					required
				/>
				<PasswordInput
					onChange={onChange}
					value={state.password}
					name={'password'}
					placeholder={'Пароль'}
					required
				/>
				<Button htmlType="submit" extraClass={'mt-6'}>
					Зарегистрироваться
				</Button>
				{formSubmitted && !isLoading && error && (
					<p className="text text_type_main-default mb-6 mt-6">{`Ошибка: ${error}`}</p>
				)}
				<p className="text text_type_main-small text_color_inactive mt-20">
					Уже зарегистрированы?&ensp;
					<Link to={'/login'} className={styles.link}>
						Войти
					</Link>
				</p>
			</form>
		</div>
	);
};

export default RegisterPage;

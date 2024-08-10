import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const Error404Page: FC = () => {
	const navigate = useNavigate();

	const handleClick = (e: React.SyntheticEvent) => {
		navigate('/', { replace: true });
	};

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				margin: '0 auto',
			}}
		>
			<div style={{ textAlign: 'center' }} className="text text_type_main-large">
				<span style={{ fontSize: 150 }}>404</span>
				<br />
				<span>Страница не найдена</span>
				<br />
				<Button htmlType="button" onClick={handleClick} extraClass="mt-6">
					НА ГЛАВНУЮ
				</Button>
			</div>
		</div>
	);
};

export default Error404Page;

import React, { FC } from 'react';
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import appHeader from './app-header.module.css';
import MenuItem from '../menu-item/menu-item';
import { useSelector } from './../../services/store';

const AppHeader: FC = () => {
	const { user, isAuthChecked } = useSelector((store) => store.user);

	return (
		<header className={appHeader.header}>
			<div className={`${appHeader.container} pt-3 pb-3`}>
				<nav className={appHeader.navigation}>
					<MenuItem href="/" text="Конструктор" iconComponent={BurgerIcon} />
					<MenuItem href="feed" text="Лента заказов" iconComponent={ListIcon} />
				</nav>
				<div className={appHeader.logoWrapper}>
					<Logo />
				</div>

				<div className={appHeader.profileLink}>
					{isAuthChecked && (
						<MenuItem
							href="profile"
							text={user?.name ? user.name : `Личный кабинет`}
							iconComponent={ProfileIcon}
						/>
					)}
				</div>
			</div>
		</header>
	);
};

export default AppHeader;

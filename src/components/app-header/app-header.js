import React from 'react';
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import appHeader from './app-header.module.css';
import MenuItem from '../menu-item/menu-item';

const AppHeader = ({ activeMenuItem, onMenuClick }) => {
	return (
		<header className={appHeader.header}>
			<div className={`${appHeader.container} pt-3 pb-3`}>
				<nav className={appHeader.navigation}>
					<MenuItem
						text="Конструктор"
						isActive={activeMenuItem === 'Конструктор'}
						handleClick={onMenuClick}
						iconComponent={BurgerIcon}
					/>
					<MenuItem
						text="Лента заказов"
						isActive={activeMenuItem === 'Лента заказов'}
						handleClick={onMenuClick}
						iconComponent={ListIcon}
					/>
				</nav>
				<div className={appHeader.logoWrapper}>
					<Logo />
				</div>

				<div className={appHeader.profileLink}>
					<MenuItem
						text="Личный кабинет"
						isActive={activeMenuItem === 'Личный кабинет'}
						handleClick={onMenuClick}
						iconComponent={ProfileIcon}
					/>
				</div>
			</div>
		</header>
	);
};

AppHeader.propTypes = {
	activeMenuItem: PropTypes.string.isRequired,
	onMenuClick: PropTypes.func.isRequired,
};

export default AppHeader;

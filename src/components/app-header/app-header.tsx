/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC, useState } from 'react';
import {
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import appHeader from './app-header.module.css';
import MenuItem from '../menu-item/menu-item';
import { useSelector } from '../../services/store';
import LogoResponsive from '../logo-responsive/logo-responsive';
import MenuMobile from '../menu-mobile/menu-mobile';

const AppHeader: FC = () => {
	const { user, isAuthChecked } = useSelector((store) => store.user);

	const [isMobileMenuOpen, setMobileMenu] = useState(false);

	const handleMobileMenuToggle = () => {
		setMobileMenu(!isMobileMenuOpen);
	};

	return (
		<>
			{isMobileMenuOpen && (
				<div
					className={`${appHeader.mobileMenuWrap} ${
						isMobileMenuOpen ? `${appHeader.mobileMenuWrapShow}` : ''
					}`}
				>
					<MenuMobile
						onMenuItemClick={handleMobileMenuToggle}
						closeMenu={() => setMobileMenu(false)}
					/>
					<div
						className={`btn-close ${appHeader.btnClose}`}
						onClick={() => setMobileMenu(false)}
					/>
				</div>
			)}

			<header className={appHeader.header}>
				<div className={`${appHeader.container} pt-3 pb-3`}>
					<nav className={appHeader.navigation}>
						<MenuItem href="/" text="Конструктор" iconComponent={BurgerIcon} />
						<MenuItem href="feed" text="Лента заказов" iconComponent={ListIcon} />
					</nav>
					<div className={appHeader.logoWrapper}>
						<LogoResponsive />
					</div>

					<div className={`${appHeader.right}`}>
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

					<div className={`${appHeader.burger}`} onClick={handleMobileMenuToggle}>
						<span />
						<span />
						<span />
					</div>
				</div>
			</header>
		</>
	);
};

export default AppHeader;

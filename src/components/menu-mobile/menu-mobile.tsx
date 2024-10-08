/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
	ProfileIcon,
	BurgerIcon,
	ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, SyntheticEvent } from 'react';
import { matchPath, NavLink, useLocation } from 'react-router-dom';
import MenuItem from '../menu-item/menu-item';
import { useDispatch, useSelector } from '../../services/store';
import { logout } from '../../services/slices/userSlice';
import styles from './menu-mobile.module.css';
import withOnEsc from '../hocs/withOnEsc';

interface IMenuMobileProps {
	onMenuItemClick: (e?: SyntheticEvent) => void;
	closeMenu?: () => void;
}

const MenuMobile: FC<IMenuMobileProps> = ({ onMenuItemClick, closeMenu }) => {
	const { user, isAuthChecked } = useSelector((store) => store.user);
	const dispatch = useDispatch();
	const location = useLocation();

	const makeMenuItemClass = ({ isActive }: { isActive: boolean }): string => {
		const linkClass = `p-4 ${styles.menuItem}`;
		return isActive ? `${linkClass} ${styles.menuItemActive}` : linkClass;
	};

	const handleLogoutClick = (e: React.SyntheticEvent) => {
		e.preventDefault();
		dispatch(logout());
	};

	const isProfileActive = () =>
		matchPath(location.pathname, '/profile') || matchPath(location.pathname, '/orders');

	const toggleSubmenu = (e: React.SyntheticEvent) => {
		if (e && e.target && (e.target as HTMLSpanElement).closest(`.${styles.submenuBtn}`)) {
			const btn = (e.target as HTMLSpanElement).closest(`.${styles.submenuBtn}`);

			btn?.classList.toggle(styles.submenuBtnActive);
		}
	};

	const MenuOverlay = closeMenu ? withOnEsc(closeMenu)(Overlay) : Overlay;
	console.log('closeMenu', closeMenu, 'MenuOverlay', MenuOverlay);

	return (
		<div className={`${styles.menuMobile}`}>
			<MenuOverlay onClick={closeMenu} />
			<div className={`${styles.inner}`}>
				<div className={`${styles.title}`}>Меню</div>
				<nav>
					<ul>
						<li>
							<span
								className={`${styles.menuItem} ${styles.submenuBtn} ${
									isProfileActive() && styles.menuItemActive
								} p-5`}
								onClick={toggleSubmenu}
							>
								<ProfileIcon type={isProfileActive() ? 'primary' : 'secondary'} />
								<span className="pl-2">
									{user?.name ? user.name : `Личный кабинет`}
								</span>
							</span>
							<ul>
								<li>
									<NavLink
										to="/profile"
										className={makeMenuItemClass}
										onClick={onMenuItemClick}
										end
									>
										Профиль
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/profile/orders"
										className={makeMenuItemClass}
										onClick={onMenuItemClick}
									>
										История заказов
									</NavLink>
								</li>
								<li>
									<div
										role="button"
										tabIndex={0}
										onClick={(e) => {
											onMenuItemClick();
											handleLogoutClick(e);
										}}
										className={`p-4 ${styles.menuItem}`}
										style={{ cursor: 'pointer' }}
									>
										Выход
									</div>
								</li>
							</ul>
						</li>
						<li>
							<div onClick={onMenuItemClick}>
								<MenuItem href="/" text="Конструктор" iconComponent={BurgerIcon} />
							</div>
						</li>
						<li>
							<div onClick={onMenuItemClick}>
								<MenuItem
									href="feed"
									text="Лента заказов"
									iconComponent={ListIcon}
								/>
							</div>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
};

const Overlay: FC<any> = (props: { onClick?: () => void }) => (
	<div className={`${styles.overlay}`} {...props} />
);

export default MenuMobile;

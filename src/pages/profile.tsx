import React, { FC } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import styles from './profile.module.css';
import { useDispatch } from './../services/store';
import { logout } from '../services/slices/userSlice';

const ProfilePage: FC = () => {
	const dispatch = useDispatch();
	const makeMenuItemClass = ({ isActive }: { isActive: boolean }): string => {
		const linkClass = 'p-4 ' + styles.menuItem;
		return isActive ? linkClass + ' ' + styles.menuItemActive : linkClass;
	};

	const handleLogoutClick = (e: React.SyntheticEvent) => {
		e.preventDefault();
		dispatch(logout());
	};

	return (
		<div className={styles.container}>
			<div className={styles.navWrapper}>
				<nav>
					<ul className={`text text_type_main-medium ${styles.menu}`}>
						<li>
							<NavLink to={'/profile'} className={makeMenuItemClass} end>
								Профиль
							</NavLink>
						</li>
						<li>
							<NavLink to={'./orders'} className={makeMenuItemClass}>
								История заказов
							</NavLink>
						</li>
						<li>
							<Link
								onClick={handleLogoutClick}
								to="#"
								className={`p-4 ${styles.menuItem}`}
							>
								Выход
							</Link>
						</li>
					</ul>
				</nav>
			</div>
			<div className={styles.tabContentWrapper}>
				<Outlet />
			</div>
		</div>
	);
};

export default ProfilePage;

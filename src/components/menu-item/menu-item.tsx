import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import menuItem from './menu-item.module.css';

interface IMenuItemProps {
	iconComponent?: React.ElementType;
	text: string;
	href: string;
}

const MenuItem: FC<IMenuItemProps> = ({ iconComponent, text, href }) => {
	const showIcon = (isActive: boolean) => {
		return (
			iconComponent &&
			React.createElement(iconComponent, {
				type: isActive ? 'primary' : 'secondary',
			})
		);
	};

	const linkClass = `${menuItem.menuItem}`;

	return (
		<NavLink
			to={href}
			className={({ isActive }) => {
				return isActive ? `${linkClass} ${menuItem.menuItemActive}` : linkClass;
			}}
		>
			{({ isActive }) => {
				return (
					<>
						{showIcon(isActive)}
						<span className="pl-2">{text}</span>
					</>
				);
			}}
		</NavLink>
	);
};

export default MenuItem;

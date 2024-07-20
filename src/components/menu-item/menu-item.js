import React from 'react';
import menuItem from './menu-item.module.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const MenuItem = ({ iconComponent, text, href }) => {
	const showIcon = (isActive) => {
		return (
			<>
				{iconComponent &&
					React.createElement(iconComponent, {
						type: isActive ? 'primary' : 'secondary',
					})}
			</>
		);
	};

	const linkClass = 'p-5 ' + menuItem.menuItem;

	return (
		<NavLink
			to={href}
			className={({ isActive }) => {
				return isActive ? linkClass + ' ' + menuItem.menuItemActive : linkClass;
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

MenuItem.propTypes = {
	iconComponent: PropTypes.elementType,
	text: PropTypes.string.isRequired,
	href: PropTypes.string.isRequired,
};

export default MenuItem;

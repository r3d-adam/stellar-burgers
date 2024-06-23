import React from 'react';
import menuItem from './menu-item.module.css';
import PropTypes from 'prop-types';

const MenuItem = ({ isActive, handleClick, iconComponent, text }) => {
	return (
		<div
			onClick={() => handleClick(text)}
			className={'p-5 ' + menuItem.menuItem + (isActive ? ` ${menuItem.menuItemActive}` : '')}
		>
			{iconComponent &&
				React.createElement(iconComponent, {
					type: isActive ? 'primary' : 'secondary',
				})}
			<span className="pl-2">{text}</span>
		</div>
	);
};

MenuItem.propTypes = {
	isActive: PropTypes.bool,
	iconComponent: PropTypes.elementType,
	handleClick: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired,
};

export default MenuItem;

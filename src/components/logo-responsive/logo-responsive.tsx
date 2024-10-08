/* eslint-disable react/no-unknown-property */

import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './logo-responsive.module.css';
import { ReactComponent as MobileLogo } from '../../images/mobileLogo.svg';

export default function LogoResponsive() {
	return (
		<>
			<div className={`${styles.logoDesktop} ${styles.logo}`}>
				<Logo />
			</div>
			<div className={`${styles.logoMobile} ${styles.logo}`}>
				<MobileLogo />
			</div>
		</>
	);
}

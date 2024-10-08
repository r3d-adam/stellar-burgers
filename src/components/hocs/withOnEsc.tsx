/* eslint-disable react/display-name */
import { FC, KeyboardEvent, useEffect } from 'react';

type TWithOnEsc = () => void;

const withOnEsc = (onEsc: TWithOnEsc) => (WrappedComponent: FC<any>) => (props: any) => {
	useEffect(() => {
		const handleEscPress = (e: KeyboardEvent) => {
			if (e.code === 'Escape') {
				onEsc();
			}
		};
		document.addEventListener('keydown', handleEscPress as unknown as EventListener);

		return () => {
			document.removeEventListener('keydown', handleEscPress as unknown as EventListener);
		};
	}, []);

	return <WrappedComponent {...props} />;
};

export default withOnEsc;

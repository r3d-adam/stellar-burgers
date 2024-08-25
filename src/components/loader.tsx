import React, { FC } from 'react';
import { Oval } from 'react-loader-spinner';

const Loader: FC = () => {
	return (
		<div
			style={{
				display: 'flex',
				height: 'auto',
				margin: '0 auto',
				justifyContent: 'center',
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Oval
					visible={true}
					height="60"
					width="60"
					color="#4c4cff"
					secondaryColor="#8585ad"
					ariaLabel="oval-loading"
					wrapperStyle={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flex: '1 0 auto',
					}}
					wrapperClass={''}
				/>
			</div>
		</div>
	);
};

export default Loader;

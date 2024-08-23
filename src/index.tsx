import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './services/store';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.querySelector('#root') as HTMLElement);
root.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
);

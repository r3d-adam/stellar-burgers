import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/app/app';
import { store } from './services/store';

const root = ReactDOM.createRoot(document.querySelector('#root') as HTMLElement);
root.render(
	<Provider store={store}>
		<Router basename="/stellar-burgers">
			<App />
		</Router>
	</Provider>,
);

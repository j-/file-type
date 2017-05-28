import { createStore as createReduxStore } from 'redux';
import rootReducer from './reducer';

interface Window {
	__REDUX_DEVTOOLS_EXTENSION__?: Function;
}

declare var window: Window;

export const createStore = () => (
	createReduxStore(
		rootReducer,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

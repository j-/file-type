import { createStore as createReduxStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducer';

export const createStore = () => (
	createReduxStore(
		rootReducer,
		composeWithDevTools()
	)
);

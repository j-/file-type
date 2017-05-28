import { combineReducers } from 'redux';

import files, {
	FilesReducerState,
	getFiles as getFilesFromFilesState,
} from './files';

const rootReducer = combineReducers({
	files,
});

export type RootReducerState = {
	files: FilesReducerState;
};

export default rootReducer;

export const getFiles = (state: RootReducerState) => (
	getFilesFromFilesState(state.files)
);

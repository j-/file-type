import { combineReducers } from 'redux';

import files, {
	FilesReducerState,
	getFiles as getFilesFromFilesState,
} from './files';

export type RootReducerState = {
	files: FilesReducerState;
};

export default combineReducers<RootReducerState>({
	files,
});

export const getFiles = (state: RootReducerState) => (
	getFilesFromFilesState(state.files)
);

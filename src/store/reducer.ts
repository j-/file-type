import { combineReducers } from 'redux';

import * as files from './files';

export type ReducerState = {
	files: files.ReducerState;
};

export default combineReducers<ReducerState>({
	files: files.default,
});

export const getFiles = (state: ReducerState) => (
	files.getFiles(state.files)
);

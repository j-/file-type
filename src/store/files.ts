import { Action } from 'redux';

import {
	AddFileAction,
	ClearFilesAction,
} from './actions';

export type FilesReducerState = {
	name: string;
	type: string | null;
}[];

const DEFAULT_STATE: FilesReducerState = [];

export default (state = DEFAULT_STATE, action: AddFileAction | ClearFilesAction | Action) => {
	switch (action.type) {
		case 'ADD_FILE':
			return [
				...state,
				(<AddFileAction> action).payload,
			];
		case 'CLEAR_FILES':
			return [];
		default:
			return state;
	}
};

export const getFiles = (state: FilesReducerState) => state;

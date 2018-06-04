import { Action } from 'redux';

import {
	ActionAddFile,
	isAddFileAction,
	ActionClearFiles,
	isClearFilesAction,
} from './actions';

export type ReducerState = {
	name: string;
	type: string | null;
}[];

const DEFAULT_STATE: ReducerState = [];

export default (state = DEFAULT_STATE, action: ActionAddFile | ActionClearFiles | Action) => {
	if (isAddFileAction(action)) {
		return [
			...state,
			action.payload,
		];
	}

	if (isClearFilesAction(action)) {
		return [];
	}

	return state;
};

export const getFiles = (state: ReducerState) => state;

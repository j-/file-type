import { Action } from 'redux';

import {
	AddFileAction,
	isAddFileAction,
	ClearFilesAction,
	isClearFilesAction,
} from './actions';

export type ReducerState = {
	name: string;
	type: string | null;
}[];

const DEFAULT_STATE: ReducerState = [];

export default (state = DEFAULT_STATE, action: AddFileAction | ClearFilesAction | Action) => {
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

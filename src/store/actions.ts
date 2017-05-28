import { Action } from 'redux';

export interface AddFileAction {
	type: 'ADD_FILE';
	payload: {
		name: string;
		type?: string;
	};
}

export const isAddFileAction = (action: Action): action is AddFileAction => (
	action.type === 'ADD_FILE'
);

export const addFile = (payload: { name: string, type?: string }): AddFileAction => ({
	type: 'ADD_FILE',
	payload,
});

export interface ClearFilesAction {
	type: 'CLEAR_FILES';
}

export const isClearFilesAction = (action: Action): action is ClearFilesAction => (
	action.type === 'CLEAR_FILES'
);

export const clearFiles = (): ClearFilesAction => ({
	type: 'CLEAR_FILES',
});

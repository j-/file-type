import { Action } from 'redux';

export interface ActionAddFile extends Action {
	type: 'ADD_FILE';
	payload: {
		name: string;
		type: string | null;
	};
}

export const isAddFileAction = (action: Action): action is ActionAddFile => (
	action.type === 'ADD_FILE'
);

export const addFile = (payload: { name: string, type: string | null }): ActionAddFile => ({
	type: 'ADD_FILE',
	payload,
});

export interface ActionClearFiles extends Action {
	type: 'CLEAR_FILES';
}

export const isClearFilesAction = (action: Action): action is ActionClearFiles => (
	action.type === 'CLEAR_FILES'
);

export const clearFiles = (): ActionClearFiles => ({
	type: 'CLEAR_FILES',
});

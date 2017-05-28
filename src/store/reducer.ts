import { Action } from 'redux';

interface ReducerState {

}

const DEFAULT_STATE: ReducerState = {

};

export default (state = DEFAULT_STATE, action: Action) => {
	switch (action.type) {
		default:
			return state;
	}
};

import { connect } from 'react-redux';
import App from '../components/App';
import { addFile, clearFiles } from '../store/actions';

import {
	RootReducerState,
	getFiles,
} from '../store/reducer';

interface StateProps {
	files: {
		name: string;
		type: string | null;
	}[];
}

const mapStateToProps = (state: RootReducerState) => ({
	files: getFiles(state),
});

interface DispatchProps {
	onAddFile: Function;
	onClearFiles: Function;
}

const mapDispatchToProps = {
	onAddFile: addFile,
	onClearFiles: clearFiles,
};

type OwnProps = {};

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(App);

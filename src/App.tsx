import * as React from 'react';
import './App.css';
import { Observable, Subscription } from 'rxjs';
import * as fileType from 'file-type';
import ProjectDescription from './ProjectDescription';

const { fromEvent, merge, zip } = Observable;

// Event streams
const pasteEvents = fromEvent<ClipboardEvent>(window, 'paste');
const dragEvents = fromEvent<DragEvent>(window, 'dragover');
const dropEvents = fromEvent<DragEvent>(window, 'drop');
const dragAndDropEvents = merge(dragEvents, dropEvents);

// Get transfer data from events
const dropData = dropEvents.pluck<DragEvent, DataTransfer>('dataTransfer');
const pasteData = pasteEvents.pluck<ClipboardEvent, DataTransfer>('clipboardData');
const dataTransfers = merge(dropData, pasteData);

// Grab files from each data transfer
const files = dataTransfers.flatMap((dataTransfer) => dataTransfer.files);

// Get array buffer from each file
const buffers = files.flatMap((file) => (
	new Promise<Buffer>((resolve) => {
		const blob = file.slice(0, 4100);
		const reader = new FileReader();
		reader.addEventListener('load', () => resolve(reader.result));
		reader.readAsArrayBuffer(blob);
	})
));

// Get file information from each buffer
const fileTypes = buffers.map((result) => fileType(result));

// Join file information
const dataList = zip(files, fileTypes, (file, type) => ({
	name: file.name,
	type: type ? type.mime : null,
}));

interface State {
	list: {
		name: string;
		type: string | null;
	}[];
}

class App extends React.Component<{}, State> {
	private dragDropEventSubscription: Subscription;
	private dataTransferSubscription: Subscription;

	constructor() {
		super();
		this.state = {
			list: [],
		};
	}

	public componentDidMount() {
		this.dragDropEventSubscription = dragAndDropEvents
			.subscribe((e) => e.preventDefault());
		this.dataTransferSubscription = dataList
			.subscribe((data) => (
				this.setState((state) => ({
					list: state.list.concat(data),
				}))
			));
	}

	public componentWillUnmount() {
		this.dragDropEventSubscription.unsubscribe();
		this.dataTransferSubscription.unsubscribe();
	}

	public render() {
		return (
			<div className="App">
				<h1>File Types</h1>
				<ProjectDescription />
				<p>File list (latest at top)</p>
				<ol className="App-list">
					{this.renderListItems()}
				</ol>
			</div>
		);
	}

	private renderListItems() {
		return this.state.list.map(({ name, type }, i) => (
			<li className="App-file" key={i}>
				<span className="App-file-name">{name}</span><br />
				<span className="App-file-type">{type || <em>Unknown</em>}</span>
			</li>
		));
	}
}

export default App;

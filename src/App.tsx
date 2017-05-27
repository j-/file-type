import * as React from 'react';
import './App.css';
import { Observable, Subscription } from 'rxjs';
import * as fileType from 'file-type';
import { FileTypeResult } from 'file-type';

const { fromEvent, merge } = Observable;

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

interface State {
	types: FileTypeResult[];
}

class App extends React.Component<{}, State> {
	private dragDropEventSubscription: Subscription;
	private dataTransferSubscription: Subscription;

	constructor() {
		super();
		this.state = {
			types: [],
		};
	}

	public componentDidMount() {
		this.dragDropEventSubscription = dragAndDropEvents
			.subscribe((e) => e.preventDefault());
		this.dataTransferSubscription = fileTypes
			.subscribe((type) => (
				this.setState((state) => ({
					types: state.types.concat(type),
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
				<p>
					Drag+drop or copy+paste files into this window. Uses
					{' '}
					<code><a href="https://github.com/sindresorhus/file-type">file-type</a></code>
					{' '}
					to determine the type of each file based on its
					{' '}
					<a href="http://en.wikipedia.org/wiki/Magic_number_(programming)#Magic_numbers_in_files">magic number</a>.
					{' '}
					Pasting files in Chrome will not work until
					{' '}
					<a href="https://bugs.chromium.org/p/chromium/issues/detail?id=361980">Issue 361980</a>
					{' '}
					is resolved.
				</p>
				<ol>
					{this.renderListItems()}
				</ol>
			</div>
		);
	}

	private renderListItems() {
		return this.state.types.map((types, i) => (
			<li key={i}>
				{types && types.mime}
			</li>
		));
	}
}

export default App;

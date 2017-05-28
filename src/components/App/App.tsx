import * as React from 'react';
import './App.css';
import { Observable, Subscription } from 'rxjs';
import * as fileType from 'file-type';
import ProjectDescription from '../ProjectDescription';
import FileList from '../FileList';

const { fromEvent, merge, zip } = Observable;

interface State {
	list: {
		name: string;
		type: string | null;
	}[];
}

class App extends React.Component<{}, State> {
	private dragDropEventSubscription: Subscription;
	private dataTransferSubscription: Subscription;
	private fileInput: HTMLInputElement;

	constructor() {
		super();
		this.state = {
			list: [],
		};
		this.clearFiles = this.clearFiles.bind(this);
	}

	public componentDidMount() {
		// Event streams
		const pasteEvents = fromEvent<ClipboardEvent>(window, 'paste');
		const dragEvents = fromEvent<DragEvent>(window, 'dragover');
		const dropEvents = fromEvent<DragEvent>(window, 'drop');
		const changeEvents = fromEvent<Event>(this.fileInput, 'change');
		const dragAndDropEvents = merge(dragEvents, dropEvents);

		// Get transfer data from events
		const dropData = dropEvents.pluck<DragEvent, DataTransfer>('dataTransfer');
		const pasteData = pasteEvents.pluck<ClipboardEvent, DataTransfer>('clipboardData');
		const dataTransfers = merge(dropData, pasteData);

		// Grab files from each data transfer
		const dataTransferFiles = dataTransfers.flatMap((dataTransfer) => dataTransfer.files);
		const changedFiles = changeEvents.flatMap(() => this.fileInput.files || []);
		const files = merge(dataTransferFiles, changedFiles);

		// Get array buffer from each file
		const buffers = files.flatMap((file) => (
			new Promise<Buffer>((resolve) => {
				const blob = file.slice(0, 4100);
				const reader = new FileReader();
				reader.onload = () => resolve(reader.result);
				reader.onerror = () => resolve();
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

		// Subscribe to events
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
		const { list } = this.state;
		const canClear = list.length > 0;
		const clearButton = canClear && (
			<button type="button" onClick={this.clearFiles}>Clear Files</button>
		);
		const fileUpload = (
			<input
				type="file"
				ref={(input) => this.fileInput = input}
				multiple={true}
			/>
		);
		return (
			<div className="App">
				<h1>File Types</h1>
				<ProjectDescription />
				<h2>File List (latest at top)</h2>
				<p>{fileUpload}</p>
				<p>{clearButton}</p>
				<FileList files={list} />
			</div>
		);
	}

	private clearFiles() {
		this.setState((state) => ({
			list: [],
		}));
	}
}

export default App;

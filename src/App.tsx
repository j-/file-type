import * as React from 'react';
import './App.css';
import { Observable, Subscription } from 'rxjs';
import * as fileType from 'file-type';

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
		const reader = new FileReader();
		reader.addEventListener('load', () => resolve(reader.result));
		reader.readAsArrayBuffer(file);
	})
));

// Get file information from each buffer
const fileTypes = buffers.map((result) => fileType(result));

class App extends React.Component<{}, null> {
	private dragDropEventSubscription: Subscription;
	private dataTransferSubscription: Subscription;

	public componentDidMount() {
		this.dragDropEventSubscription = dragAndDropEvents
			.subscribe((e) => e.preventDefault());
		this.dataTransferSubscription = fileTypes
			.subscribe((file) => console.log(file));
	}

	public componentWillUnmount() {
		this.dragDropEventSubscription.unsubscribe();
		this.dataTransferSubscription.unsubscribe();
	}

	render() {
		return (
			<div className="App">
				<h1>File Types</h1>
				<p>Drag+drop or copy+paste files into this window. Check console for results.</p>
			</div>
		);
	}
}

export default App;

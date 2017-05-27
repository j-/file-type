import * as React from 'react';
import File from './File';
import './FileList.css';

export interface Props {
	files: {
		name: string;
		type: string | null;
	}[];
}

export default class FileList extends React.Component<Props, void> {
	render() {
		const { files } = this.props;
		const children = files.map((file, i) => (
			<li key={i}>
				<File name={file.name} type={file.type} />
			</li>
		));
		return (
			<ol className="FileList">
				{children}
			</ol>
		);
	}
}

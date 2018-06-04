import * as React from 'react';
import './File.css';

export interface Props {
	name: string;
	type: string | null;
}

export default class File extends React.Component<Props, {}> {
	render() {
		const { name, type } = this.props;
		return (
			<div className="File">
				<span className="File-name">{name}</span><br />
				<span className="File-type">{type || <em>Unknown</em>}</span>
			</div>
		);
	}
}

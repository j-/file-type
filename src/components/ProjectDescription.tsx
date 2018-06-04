import * as React from 'react';

const ProjectDescription: React.StatelessComponent = () => (
	<div>
		<p>
			Use this tool to determine the type of a file without relying on its extension.
		</p>
		<p>
			Upload, drag+drop or copy+paste files into this window. Uses
			{' '}
			<code><a href="https://github.com/sindresorhus/file-type">file-type</a></code>
			{' '}
			to determine the type of each file based on its
			{' '}
			<a href="http://en.wikipedia.org/wiki/Magic_number_(programming)#Magic_numbers_in_files">magic number</a>.
			{' '}
			Files pasted into a Chrome window may not appear due to
			{' '}
			<a href="https://bugs.chromium.org/p/chromium/issues/detail?id=316472">Issue 316472</a>.
		</p>
	</div>
);

export default ProjectDescription;

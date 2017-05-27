import * as React from 'react';

const ProjectDescription = () => (
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
);

export default ProjectDescription;

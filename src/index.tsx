import './style.scss';
import { Default } from '@views';
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => (
	<div className="root">
		<Default />
	</div>
);

const rootEl = document.getElementById('root');

ReactDOM.render(<App />, rootEl);

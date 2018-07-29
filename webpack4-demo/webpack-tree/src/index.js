import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { minus } from './util';

class App extends PureComponent {
	render() {
		return <div>{ minus(100,20)}</div>;
	}
}

ReactDOM.render(<App />, document.getElementById('root'));

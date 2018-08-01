import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { minus } from './util';

class App extends PureComponent {
	render() {
		return <div>{ minus(100,20)}</div>;
	}
}
//http://webpack.wuhaolin.cn/4%E4%BC%98%E5%8C%96/4-10%E4%BD%BF%E7%94%A8TreeShaking.html
ReactDOM.render(<App />, document.getElementById('root'));

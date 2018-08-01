import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route,Switch } from 'react-router-dom';
import Bundle from './asyncComponent';
let Home = () => <div>Home</div>;

let LazyAbout=(props) => (<Bundle {...props} load={()=>import('./about')}/>)


ReactDOM.render(
	<Router>
		<div>
			<Route exact path="/" component={Home} />
			<Route exact path="/about" component={LazyAbout} />
			</div>
	</Router>,
	document.getElementById('root')
);

//会生成一个utils文件
// document.getElementById('root').addEventListener('click',function(){
// 	import('./util').then(res=>{
// 		console.log(res.add(20,30))
// 	})
// })
// class App extends PureComponent {
// 	render() {
// 		return <div>{ minus(100,20)}</div>;
// 	}
// }
// //http://webpack.wuhaolin.cn/4%E4%BC%98%E5%8C%96/4-10%E4%BD%BF%E7%94%A8TreeShaking.html
// ReactDOM.render(<App />, document.getElementById('root'));

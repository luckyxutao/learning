import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
require('./app.css');
const routerThen = (app, callback, [component, model]) => {
    app.model(model.default || model)
    callback(null, component.default || component)
}
var App = React.createClass({
  render: function () {
    return (
      <div>
        <header>
          <ul>
            <li><Link to="/app">Dashboard</Link></li>
            <li><Link to="/inbox">Inbox</Link></li>
            <li><Link to="/calendar">Calendar</Link></li>
          </ul>
          Logged in as Jane
        </header>
        {this.props.children}
      </div>
    );
  }
});

var Dashboard = React.createClass({
  render: function () {
    return (
      <div>
        <p>Dashboard</p>
      </div>
    );
  }
});

const Inbox = (location, callback) => {
    System.import('./inbox.jsx').then(component => {
        callback(null, component.default || component)
    })
}

const Calendar = (location, callback) => {
    System.import('./calendar.jsx').then(component => {
        callback(null, component.default || component)
    })
}
render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard}/>
      <Route path="app" component={Dashboard}/>
      <Route path="inbox" getComponent={Inbox}/>
      <Route path="calendar" getComponent={Calendar}/>
      <Route path="*" component={Dashboard}/>
    </Route>
  </Router>
), document.querySelector('#app'));
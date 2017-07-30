import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
require('./app.css');

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
  require.ensure([], require => {
    callback(null,require('./inbox.jsx').default)
  })  
}

const Calendar = (location, callback) => {
  require.ensure([], require => {
    callback(null,require('./calendar.jsx').default)
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
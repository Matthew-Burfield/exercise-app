import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './App';
import Dashboard from './components/Dashboard';
import Exercises from './components/Exercises';
import Exercise from './components/Exercise';
import './index.scss';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="/exercises" component={Exercises}>
        <Route path="/exercises/:name" component={Exercise} />
      </Route>
    </Route>
  </Router>,
  document.getElementById('root'),
);

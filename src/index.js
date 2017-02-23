import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './App';
import Dashboard from './components/Dashboard';
import Exercises from './components/Exercises';
import Exercise from './components/Exercise';
import './index.scss';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="/exercises" component={Exercises}>
        <Route path="/exercises/:name" component={Exercise} />
      </Route>
    </Route>
  </Router>,
  document.getElementById('root'),
);

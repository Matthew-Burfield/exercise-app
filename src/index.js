import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import * as reducer from './reducers/reducer';
import App from './App';
import Dashboard from './components/Dashboard';
import Exercises from './components/Exercises';
import Exercise from './components/Exercise';
import './index.scss';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Dashboard} />
        <Route path="/exercises" component={Exercises}>
          <Route path="/exercises/:name" component={Exercise} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

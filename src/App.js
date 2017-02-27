import React from 'react';
import { connect } from 'react-redux';

import { NavBarTop, NavBarBottom } from './components/NavBar';
import './App.scss';


const App = ({ data, dispatch, children }) =>
  <div className="App">
    <NavBarTop />
    {children && React.cloneElement(children, {
      data,
      dispatch,
    })}
    <NavBarBottom
      dispatch={dispatch}
    />
  </div>;

const mapStateToProps = state => ({
  data: state,
});

const AppContainer = connect(mapStateToProps)(App);

App.propTypes = {
  children: React.PropTypes.element,
  data: React.PropTypes.shape({}),
  dispatch: React.PropTypes.func,
};

App.defaultProps = {
  children: [],
  data: React.PropTypes.shape({}),
  dispatch: () => {},
};

export default AppContainer;

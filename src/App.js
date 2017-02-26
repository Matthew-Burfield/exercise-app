import React from 'react';
import { connect } from 'react-redux';

import { NavBarTop, NavBarBottom } from './components/NavBar';
import './App.scss';

function placeholder() {
  return null;
}

const App = props =>
  <div className="App">
    <NavBarTop />
    {props.children && React.cloneElement(props.children, {
      data: props.data,
      handleFinishedSetBtnClk: placeholder,
      handleStartTimerBtnClk: placeholder,
    })}
    <NavBarBottom
      dispatch={props.dispatch}
    />
  </div>;

const mapStateToProps = state => ({
  data: state.data,
});

const AppContainer = connect(mapStateToProps)(App);

App.propTypes = {
  children: React.PropTypes.element,
  data: React.PropTypes.shape,
  dispatch: React.PropTypes.func,
};

App.defaultProps = {
  children: [],
  data: React.PropTypes.shape,
  dispatch: () => {},
};

export default AppContainer;

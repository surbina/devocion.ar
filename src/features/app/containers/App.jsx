require('./App.scss');

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { Map } from 'immutable';

import NavBar from '../components/NavBar.jsx';

import { retrieveCurrentUserAction, signOutAction } from './../../../reducers/user/actions.js';

export const App = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    user: React.PropTypes.instanceOf(Map).isRequired
  },
  componentWillMount: function() {
    this.props.dispatch(retrieveCurrentUserAction());
  },
  handleSignOut: function() {
    this.props.dispatch(signOutAction());
  },
  render: function() {
    return(
      <div className="app">
        <ReduxToastr
          newestOnTop={false}
          position="bottom-right"/>
        <NavBar onSignOut={this.handleSignOut} user={this.props.user}/>
        <main className="container">
          {this.props.children}
        </main>
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    user: state.user
  };
}    

export const AppContainer = connect(mapStateToProps)(App);
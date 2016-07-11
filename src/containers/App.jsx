import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import NavBar from '../components/NavBar';

import { retrieveCurrentUserAction, signOutAction } from '../reducers/user/actions.js';

export const App = React.createClass({
  mixins: [PureRenderMixin],
  componentWillMount: function() {
    this.props.dispatch(retrieveCurrentUserAction());
  },
  handleSignOut: function() {
    this.props.dispatch(signOutAction());
  },
  render: function() {
    return(
      <div className="container-fluid">
        <NavBar onSignOut={this.handleSignOut} user={this.props.user}/>

        {this.props.children}
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
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import SignInForm from '../components/SignInForm';

import { signInAction } from '../../../reducers/user/actions.js';

export const SignIn = React.createClass({
  mixins: [PureRenderMixin],
  handleSignInSubmit: function(user) {
    this.props.dispatch(signInAction(user));
  },
  render: function() {
    return(
      <SignInForm onSignInSubmit={this.handleSignInSubmit} />
    );
  }
});

function mapStateToProps(state) {
  return {};
}

export const SignInContainer = connect(mapStateToProps)(SignIn);
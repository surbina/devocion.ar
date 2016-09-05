import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import SignInForm from '../components/SignInForm';

import { signInAction } from '../../../reducers/user/actions.js';
import {
  SIGNING_IN_STATUS,
  VALID_USER_STATUS,
  FETCHING_USER_DATA_STATUS
} from '../../../reducers/user/reducer.js'

export const SignIn = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    isSigningIn: React.PropTypes.bool.isRequired
  },
  handleSignInSubmit: function(user) {
    this.props.dispatch(signInAction(user));
  },
  render: function() {
    return(
      <section>
        <div className="row">
          <div className="col-md-12 text-center">
            <h3>Ingresar</h3>
          </div>
        </div>
        <SignInForm
          onSignInSubmit={this.handleSignInSubmit}
          isSigningIn={this.props.isSigningIn} />
      </section>
    );
  }
});

function mapStateToProps(state) {
  return {
    isSigningIn: state.user.get('status') === SIGNING_IN_STATUS || state.user.get('status') === VALID_USER_STATUS || state.user.get('status') === FETCHING_USER_DATA_STATUS
  };
}

export const SignInContainer = connect(mapStateToProps)(SignIn);
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import SignUpForm from '../components/SignUpForm';

import { createNewUserAction } from '../../../reducers/user/actions.js';

import {
  CREATING_USER_STATUS,
  VALID_USER_STATUS,
  UPDATING_USER_DATA_STATUS
} from '../../../reducers/user/reducer.js'

export const SignUp = React.createClass({
  mixins: [PureRenderMixin],
  handleSignUpSubmit: function(user) {
    this.props.dispatch(createNewUserAction(user));
  },
  render: function() {
    return(
      <section>
        <div className="row">
          <div className="col-md-12 text-center">
            <h3>Registrarse</h3>
          </div>
        </div>
        <SignUpForm onSignUpSubmit={this.handleSignUpSubmit} isSigningUp={this.props.isSigningUp} />
      </section>
    );
  }
});

function mapStateToProps(state) {
  return {
    isSigningIn: state.user.get('status') === CREATING_USER_STATUS || state.user.get('status') === VALID_USER_STATUS || state.user.get('status') === UPDATING_USER_DATA_STATUS
  };
}

export const SignUpContainer = connect(mapStateToProps)(SignUp);
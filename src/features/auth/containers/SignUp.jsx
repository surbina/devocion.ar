import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import SignUpForm from '../components/SignUpForm';

import { createNewUserAction } from '../../../reducers/user/actions.js';

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
        <SignUpForm onSignUpSubmit={this.handleSignUpSubmit} />
      </section>
    );
  }
});

function mapStateToProps(state) {
  return {};
}

export const SignUpContainer = connect(mapStateToProps)(SignUp);
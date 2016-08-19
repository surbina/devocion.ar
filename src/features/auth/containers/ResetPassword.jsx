import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

import ResetPasswordForm from '../components/ResetPasswordForm';

import { sendResetPasswordMailAction } from '../../../reducers/user/actions.js';

export const ResetPassword = React.createClass({
  mixins: [PureRenderMixin],
  handleResetPasswordSubmit: function(email) {
    this.props.dispatch(sendResetPasswordMailAction(email));
  },
  render: function() {
    return(
      <section>
        <div className="row">
          <div className="col-md-12 text-center">
            <h3>Enviar mail para reiniciar password</h3>
          </div>
        </div>
        <ResetPasswordForm onResetPasswordSubmit={this.handleResetPasswordSubmit} />
      </section>
    );
  }
});

function mapStateToProps(state) {
  return {};
}

export const ResetPasswordContainer = connect(mapStateToProps)(ResetPassword);
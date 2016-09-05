import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Map } from 'immutable';
import { ThreeBounce } from 'better-react-spinkit';
import classNames from 'classnames';

export default React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    onResetPasswordSubmit: React.PropTypes.func.isRequired,
    isSendingResetPasswordMail: React.PropTypes.bool.isRequired
  },
  getInitialState: function() {
    return {
      email: '',
      emailValid: false,
      emailValidationMessage: ''
    };
  },
  handleEmailChange: function(e) {
    this.setState({email: e.target.value});
  },
  validateEmail: function() {
    const isValid = this.state.email.match(/(?!.*\.\.)("[!-~ ]+"|[0-9A-Z!#-'*-\/=?^-~]+)@((?![-])[A-Za-z0-9-]*[A-Za-z-]+[A-Za-z0-9-]*(?![-])\.*)+\.[a-z]+/g);
    const validationMessage = !isValid ? 'Por favor introduce una dirección de email con el siguiente formato: usuario@proveedor.com' : '';

    this.setState({
      emailValid: isValid,
      emailValidationMessage: validationMessage
    });

    return isValid;
  },
  handleSubmit: function(e) {
    e.preventDefault();

    const email = this.state.email.trim();

    if(!this.validateEmail()) {
      return
    }

    this.props.onResetPasswordSubmit(email);
    this.setState({email: ''});
  },
  render: function() {
    const emailClasses = classNames({
      'form-group': true,
      'has-error': !!this.state.emailValidationMessage
    });
    return(
      <form className="form-horizontal" onSubmit={this.handleSubmit} noValidate>
        <div className={ emailClasses }>
          <div className="col-sm-offset-4 col-sm-4">
            <label className="sr-only" htmlFor="inputEmail">Email address</label>
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              id="inputEmail"
              value={this.state.email}
              onChange={this.handleEmailChange}
              onBlur={this.validateEmail}
            />
            {!!this.state.emailValidationMessage ?
              <span id="emailHelpBlock" className="help-block">{this.state.emailValidationMessage}</span> :
              false}
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-5 col-sm-2 text-center">
            {this.props.isSendingResetPasswordMail ?
              <ThreeBounce /> :
              <button type="submit" className="btn btn-default btn-block">Enviar mail</button>}
          </div>
        </div>
      </form>
    );
  }
});
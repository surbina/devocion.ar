require('./SignInForm.scss');

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Map } from 'immutable';
import { Link } from 'react-router';
import { ThreeBounce } from 'better-react-spinkit';
import classNames from 'classnames';

export default React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    onSignInSubmit: React.PropTypes.func.isRequired,
    isSigningIn: React.PropTypes.bool.isRequired
  },
  getInitialState: function() {
    return {
      email: '',
      emailValid: false,
      emailValidationMessage: '',
      password: '',
      passwordValid: false,
      passwordValidationMessage: ''
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
  handlePasswordChange: function(e) {
    this.setState({password: e.target.value});
  },
  validatePassword: function() {
    const isValid = this.state.password.length >= 6;
    const validationMessage = !isValid ? 'Por favor introduce un password más fuerte (al menos 6 caracteres)' : '';

    this.setState({
      passwordValid: isValid,
      passwordValidationMessage: validationMessage
    });

    return isValid;
  },
  handleSubmit: function(e) {
    e.preventDefault();

    const email = this.state.email.trim();
    const password = this.state.password;

    if(!this.validateEmail() | !this.validatePassword()) {
      return
    }

    this.props.onSignInSubmit({
      email: email,
      password: password
    });
  },
  render: function() {
    const emailClasses = classNames({
      'form-group': true,
      'has-error': !!this.state.emailValidationMessage
    });

    const passwordClasses = classNames({
      'form-group': true,
      'has-error': !!this.state.passwordValidationMessage
    });
    return(
      <form className="form-horizontal sign-in-form" onSubmit={this.handleSubmit} noValidate>
        <div className={ emailClasses }>
          <div className="col-sm-offset-4 col-sm-4">
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
        <div className={ passwordClasses }>
          <div className="col-sm-offset-4 col-sm-4">
            <input
              type="password"
              placeholder="Contraseña"
              className="form-control"
              id="inputPassword"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              onBlur={this.validatePassword}
            />
            {!!this.state.passwordValidationMessage ?
              <span id="passwordHelpBlock" className="help-block">{this.state.passwordValidationMessage}</span> :
              false}
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-5 col-sm-2 text-center">
            {this.props.isSigningIn ?
              <ThreeBounce /> :
              <button type="submit" className="btn btn-default btn-block btn-submit">Ingresar</button>}
          </div>
          <div className="col-sm-offset-4 col-sm-4 text-center">
            <Link to="/reset-password">¿Olvidaste tu contraseña?</Link> - <Link to="/sign/up">¿No tienes una cuenta?</Link>
          </div>
        </div>
      </form>
    );
  }
});
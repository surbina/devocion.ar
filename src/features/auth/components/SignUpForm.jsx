import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Map } from 'immutable';
import { Link } from 'react-router';
import { ThreeBounce } from 'better-react-spinkit';
import classNames from 'classnames';

export default React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    onSignUpSubmit: React.PropTypes.func.isRequired,
    isSigningUp: React.PropTypes.bool.isRequired
  },
  getInitialState: function() {
    return {
      firstName: '',
      firstNameValid: false,
      firstNameValidationMessage: '',
      lastName: '',
      lastNameValid: false,
      lastNameValidationMessage: '',
      email: '',
      emailValid: false,
      emailValidationMessage: '',
      password: '',
      passwordValid: false,
      passwordValidationMessage: '',
      confirmPassword: '',
      confirmPasswordValid: false,
      confirmPasswordValidationMessage: ''
    };
  },
  handleFirstNameChange: function(e) {
    this.setState({firstName: e.target.value});
  },
  validateFirstName: function() {
    const isValid = !!this.state.firstName;
    const validationMessage = !isValid ? 'Por favor ingresa tu nombre' : '';

    this.setState({
      firstNameValid: isValid,
      firstNameValidationMessage: validationMessage
    });

    return isValid;
  },
  handleLastNameChange: function(e) {
    this.setState({lastName: e.target.value});
  },
  validateLastName: function() {
    const isValid = !!this.state.lastName;
    const validationMessage = !isValid ? 'Por favor ingresa tu apellido' : '';

    this.setState({
      lastNameValid: isValid,
      lastNameValidationMessage: validationMessage
    });

    return isValid;
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
  handleConfirmPasswordChange: function(e) {
    this.setState({confirmPassword: e.target.value});
  },
  validateConfirmPassword: function() {
    const isValid = this.state.confirmPassword === this.state.password;
    const validationMessage = !isValid ? 'Las contraseñas no concuerdan' : '';

    this.setState({
      confirmPasswordValid: isValid,
      confirmPasswordValidationMessage: validationMessage
    });

    return isValid;
  },
  handleSubmit: function(e) {
    e.preventDefault();

    const firstName = this.state.firstName.trim();
    const lastName = this.state.lastName.trim();
    const email = this.state.email.trim();
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;

    if(!this.validateFirstName() |
       !this.validateLastName() |
       !this.validateEmail() |
       !this.validatePassword() |
       !this.validateConfirmPassword()) {
      return;
    }

    this.props.onSignUpSubmit({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    });
  },
  render: function() {
    const firstNameClasses = classNames({
      'form-group': true,
      'has-error': !!this.state.firstNameValidationMessage
    });

    const lastNameClasses = classNames({
      'form-group': true,
      'has-error': !!this.state.lastNameValidationMessage
    });

    const emailClasses = classNames({
      'form-group': true,
      'has-error': !!this.state.emailValidationMessage
    });

    const passwordClasses = classNames({
      'form-group': true,
      'has-error': !!this.state.passwordValidationMessage
    });

    const confirmPasswordClasses = classNames({
      'form-group': true,
      'has-error': !!this.state.confirmPasswordValidationMessage
    });
    return(
      <form className="form-horizontal sign-up-form" onSubmit={this.handleSubmit} noValidate>
        <div className={ firstNameClasses }>
          <div className="col-sm-offset-4 col-sm-4">
            <input
              type="text"
              placeholder="Nombre"
              className="form-control"
              id="inputFirstName"
              value={this.state.firstName}
              onChange={this.handleFirstNameChange}
              onBlur={this.validateFirstName}
            />
            {!!this.state.firstNameValidationMessage ?
              <span id="firstNameHelpBlock" className="help-block">{this.state.firstNameValidationMessage}</span> :
              false}
          </div>
        </div>
        <div className={ lastNameClasses }>
          <div className="col-sm-offset-4 col-sm-4">
            <input
              type="text"
              placeholder="Apellido"
              className="form-control"
              id="inputLastName"
              value={this.state.lastName}
              onChange={this.handleLastNameChange}
              onBlur={this.validateLastName}
            />
            {!!this.state.lastNameValidationMessage ?
              <span id="lastNameHelpBlock" className="help-block">{this.state.lastNameValidationMessage}</span> :
              false}
          </div>
        </div>
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
        <div className={ confirmPasswordClasses }>
          <div className="col-sm-offset-4 col-sm-4">
            <input
              type="password"
              placeholder="Confirmar contraseña"
              className="form-control"
              id="inputConfirmPassword"
              value={this.state.confirmPassword}
              onChange={this.handleConfirmPasswordChange}
              onBlur={this.validateConfirmPassword}
            />
            {!!this.state.confirmPasswordValidationMessage ?
              <span id="confirmPasswordHelpBlock" className="help-block">{this.state.confirmPasswordValidationMessage}</span> :
              false}
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-5 col-sm-2 text-center">
            {this.props.isSigningUp ?
              <ThreeBounce /> :
              <button type="submit" className="btn btn-default btn-block btn-submit">Crear usuario</button>}
          </div>
          <div className="col-sm-offset-4 col-sm-4 text-center">
            <Link to="/sign/in">¿Ya tienes una cuenta?</Link>
          </div>
        </div>
      </form>
    );
  }
});
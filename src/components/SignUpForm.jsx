import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Map } from 'immutable';

export default React.createClass({
  mixins: [PureRenderMixin],
  getInitialState: function() {
    return {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};
  },
  handleFirstNameChange: function(e) {
    this.setState({firstName: e.target.value});
  },
  handleLastNameChange: function(e) {
    this.setState({lastName: e.target.value});
  },
  handleEmailChange: function(e) {
    this.setState({email: e.target.value});
  },
  handlePasswordChange: function(e) {
    this.setState({password: e.target.value});
  },
  handleConfirmPasswordChange: function(e) {
    this.setState({confirmPassword: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();

    const firstName = this.state.firstName.trim();
    const lastName = this.state.lastName.trim();
    const email = this.state.email.trim();
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;

    if(!firstName || !lastName || !email || !password || !confirmPassword || !(password === confirmPassword)) {
      return;
    }

    this.props.onSignUpSubmit({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    });
    this.setState({firstName: '', lastName: '', email: '', password: '', confirmPassword: ''});
  },
  render: function() {
    return(
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label for="inputFirstName" className="col-sm-2 control-label">Nombre</label>
          <div className="col-sm-9">
            <input
              type="text"
              placeholder="Nombre"
              className="form-control"
              id="inputFirstName"
              value={this.state.firstName}
              onChange={this.handleFirstNameChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label for="inputLastName" className="col-sm-2 control-label">Apellido</label>
          <div className="col-sm-9">
            <input
              type="text"
              placeholder="Apellido"
              className="form-control"
              id="inputLastName"
              value={this.state.lastName}
              onChange={this.handleLastNameChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label for="inputEmail" className="col-sm-2 control-label">Email</label>
          <div className="col-sm-9">
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              id="inputEmail"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label for="inputPassword" className="col-sm-2 control-label">Contraseña</label>
          <div className="col-sm-9">
            <input
              type="password"
              placeholder="Contraseña"
              className="form-control"
              id="inputPassword"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label for="inputConfirmPassword" className="col-sm-2 control-label">Confirmar contraseña</label>
          <div className="col-sm-9">
            <input
              type="password"
              placeholder="Confirmar contraseña"
              className="form-control"
              id="inputConfirmPassword"
              value={this.state.confirmPassword}
              onChange={this.handleConfirmPasswordChange}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-9">
            <button type="submit" className="btn btn-default pull-right">Crear usuario</button>
          </div>
        </div>
      </form>
    );
  }
});
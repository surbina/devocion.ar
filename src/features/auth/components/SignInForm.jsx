require('./SignInForm.scss');

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Map } from 'immutable';
import { Link } from 'react-router';

export default React.createClass({
  mixins: [PureRenderMixin],
  getInitialState: function() {
    return {email: '', password: ''};
  },
  handleEmailChange: function(e) {
    this.setState({email: e.target.value});
  },
  handlePasswordChange: function(e) {
    this.setState({password: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();

    const email = this.state.email.trim();
    const password = this.state.password;

    if(!email || !password) {
      return;
    }

    this.props.onSignInSubmit({
      email: email,
      password: password
    });
  },
  render: function() {
    return(
      <form className="form-horizontal sign-in-form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <div className="col-sm-offset-4 col-sm-4">
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
          <div className="col-sm-offset-4 col-sm-4">
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
          <div className="col-sm-offset-5 col-sm-2">
            <button type="submit" className="btn btn-default btn-block btn-submit" disabled={this.props.isSigningIn}>Ingresar</button>
          </div>
          <div className="col-sm-offset-4 col-sm-4 text-center">
            <Link to="/reset-password">¿Olvidaste tu contraseña?</Link> - <Link to="/sign/up">¿No tienes una cuenta?</Link>
          </div>
        </div>
      </form>
    );
  }
});
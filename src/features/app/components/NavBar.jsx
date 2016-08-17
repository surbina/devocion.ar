import React from 'react';
import { Link } from 'react-router';
import activeComponent from 'react-router-active-component';

import { ANONYMOUS_USER_STATUS, SIGNED_USER_STATUS } from '../../../reducers/user/reducer.js';

const NavItem = activeComponent('li');

export default React.createClass({
  handleSignOut: function(e) {
    e.preventDefault();
    this.props.onSignOut();
  },
  render: function() {
    return(
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Devocion.AR</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <NavItem to="/" onlyActiveOnIndex>Inicio</NavItem>
              <NavItem to="/admin">Administrador</NavItem>
            </ul>
            {this.props.user.get('status') === ANONYMOUS_USER_STATUS ?
              <ul className="nav navbar-nav navbar-right">
                <NavItem to="/sign/in">Ingresar</NavItem>
                <NavItem to="/sign/up">Registrarse</NavItem>
              </ul> :
            this.props.user.get('status') === SIGNED_USER_STATUS ?
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.props.user.get('user_first_name')} <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><a href="#">Editar perfil</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#" onClick={this.handleSignOut}>Salir</a></li>
                  </ul>
                </li>
              </ul> :
              <ul className="nav navbar-nav navbar-right">
                <li><p className="navbar-text">Cargando perfil del usuario</p></li>
              </ul>}
          </div>
        </div>
      </nav>
    );
  }
});
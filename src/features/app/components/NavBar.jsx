import React from 'react';
import activeComponent from 'react-router-active-component';
import { Link } from 'react-router';
import { ThreeBounce } from 'better-react-spinkit';

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
            <Link to="/devotional" className="navbar-brand">Devocion.AR</Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <NavItem to="/devotional" onlyActiveOnIndex>Inicio</NavItem>
              {this.props.user.get('is_admin') ?
                <NavItem to="/admin">Administrador</NavItem> :
                false}
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
                    <li><a href="#" onClick={this.handleSignOut}>Salir</a></li>
                  </ul>
                </li>
              </ul> :
              <ul className="nav navbar-nav navbar-right">
                <li><span className="navbar-text">Cargando perfil del usuario <ThreeBounce color="white" /></span></li>
              </ul>}
          </div>
        </div>
      </nav>
    );
  }
});
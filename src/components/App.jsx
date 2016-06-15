import React from 'react';
import { Link } from 'react-router';
import activeComponent from 'react-router-active-component';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const NavItem = activeComponent('li');

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return(
      <div className="container-fluid">
        <nav className="navbar navbar-default">
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
                {/*<li><a href="#">Inicio <span className="sr-only">(current)</span></a></li>
                <li><Link to="/">Calendario</Link></li>*/}
                <NavItem to="/" onlyActiveOnIndex>Inicio</NavItem>
                <NavItem to="/admin">Administrador</NavItem>
              </ul>

              <ul className="nav navbar-nav navbar-right">
                <li><a href="#">Link</a></li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Sebastian <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><a href="#">Editar perfil</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#">Salir</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {this.props.children}
      </div>
    );
  }
});
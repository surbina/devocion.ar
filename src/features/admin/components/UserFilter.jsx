import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  getInitialState: function() {
    return {
      firstName: '',
      lastName: '',
      email: '',
    };
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
  handleSubmit: function(e) {
    e.preventDefault();

    const firstName = this.state.firstName.trim();
    const lastName = this.state.lastName.trim();
    const email = this.state.email.trim();

    this.props.onFilter({
      firstName,
      lastName,
      email
    });
  },
  render: function() {
    return(
      <form className="form-inline text-center user-filter" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input
            id="firstNameInput"
            type="text"
            className="form-control"
            placeholder="Nombre"
            onChange={this.handleFirstNameChange} />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="lastNameInput"
            placeholder="Apellido"
            onChange={this.handleLastNameChange} />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="inputEmail"
            placeholder="Correo electrónico"
            onChange={this.handleEmailChange} />
        </div>
        <button type="submit" className="btn btn-default">Filtrar</button>
      </form>
    );
  }
});
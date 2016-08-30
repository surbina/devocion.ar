import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Map } from 'immutable';
import { ThreeBounce } from 'better-react-spinkit';

export default React.createClass({
  mixins: [PureRenderMixin],
  getInitialState: function() {
    return {email: ''};
  },
  handleEmailChange: function(e) {
    this.setState({email: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();

    const email = this.state.email.trim();

    if(!email) {
      return;
    }

    this.props.onResetPasswordSubmit(email);
    this.setState({email: ''});
  },
  render: function() {
    return(
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <div className="col-sm-offset-4 col-sm-4">
            <label className="sr-only" htmlFor="inputEmail">Email address</label>
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
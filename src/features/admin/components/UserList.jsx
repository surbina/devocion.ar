import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { List } from 'immutable';
import { ThreeBounce } from 'better-react-spinkit';

export default React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    isSaving: React.PropTypes.bool.isRequired,
    users: React.PropTypes.instanceOf(List).isRequired
  },
  getUsers: function() {
    return this.props.users || [];
  },
  userComparator: function(userA, userB) {
    return -1 * userA.get('id').localeCompare(userB.get('id'));
  },
  handleGrantAdminPrivilege: function(userId) {
    this.props.onGrantAdminPrivilege(userId);
  },
  handleDenyAdminPrivilege: function(userId) {
    this.props.onDenyAdminPrivilege(userId);
  },
  render: function() {
    return(
      <div className="table-responsive">
        <table className="table table-bordered table-condensed">
           <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Appellido</th>
                <th>Email</th>
                <th>Privilegios de administrador</th>
              </tr>
           </thead>
           <tbody>
              {this.getUsers().toArray().sort(this.userComparator).map(user => 
                <tr key={user.get('id')}>
                  <td>{user.get('id')}</td>
                  <td>{user.get('first_name')}</td>
                  <td>{user.get('last_name')}</td>
                  <td>{user.get('email')}</td>
                  <td>
                    {user.get('admin') ?
                      <button
                        className="btn btn-danger"
                        onClick={this.handleDenyAdminPrivilege.bind(this, user.get('id'))}>
                        Quitar
                      </button> :
                      <button
                        className="btn btn-success"
                        onClick={this.handleGrantAdminPrivilege.bind(this, user.get('id'))}>
                        Otorgar
                      </button>}
                  </td>
                </tr>
              )}
           </tbody>
        </table>
      </div>
    );
  }
});
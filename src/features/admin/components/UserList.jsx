import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { List } from 'immutable';
import { ThreeBounce } from 'better-react-spinkit';

import {
  fetchDevotionalPageAction,
  deleteDevotionalAction
} from '../../../reducers/devotional_list/actions.js';
import { REDUCER_FETCHING_PAGE_STATUS } from '../../../reducers/devotional_list/reducer.js';

export default React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    isSaving: React.PropTypes.bool.isRequired,
    users: React.PropTypes.instanceOf(List).isRequired
  },
  getUsers: function() {
    return this.props.users || [];
  },
  /*devotionalComparator: function(devA, devB) {
    return -1 * devA.get('publish_date').localeCompare(devB.get('publish_date'));
  },*/
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
                <th>Email</th>
                <th>Nombre</th>
                <th>Appellido</th>
                <th>Privilegios de administrador</th>
              </tr>
           </thead>
           
           <tbody>
              {this.getUsers().toArray().map(user => 
                <tr key={user.get('id')}>
                  <td>{user.get('id')}</td>
                  <td>{user.get('email')}</td>
                  <td>{user.get('first_name')}</td>
                  <td>{user.get('last_name')}</td>
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
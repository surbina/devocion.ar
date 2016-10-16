import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { ThreeBounce } from 'better-react-spinkit';

import {
  fetchUserListAction,
  submitUpdateAdminPrivilegeAction
} from '../../../reducers/user_list/actions.js';

import {
  FETCHING_STATUS,
  SUBMITTING_STATUS,
  LOADED_STATUS,
} from '../../../reducers/user_list/reducer.js';

import UserList from '../components/UserList.jsx';

export const UserPanel = React.createClass({
  mixins: [PureRenderMixin],
  componentWillMount: function() {
    this.props.dispatch(fetchUserListAction());
  },
  onGrantAdminPrivilege: function(userId) {
    this.props.dispatch(submitUpdateAdminPrivilegeAction(userId, true));
  },
  onDenyAdminPrivilege: function(userId) {
    this.props.dispatch(submitUpdateAdminPrivilegeAction(userId, false));
  },
  render: function() {
    return(
      <section className="admin-panel">
        <div className="row">
          <div className="col-md-12 text-center">
            <h3>Administrar usuarios</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            {this.props.isFetching ?
              <ThreeBounce /> :
              <UserList
                users={this.props.userList.toList()}
                isSaving={this.props.isSaving}
                onGrantAdminPrivilege={this.onGrantAdminPrivilege}
                onDenyAdminPrivilege={this.onDenyAdminPrivilege} />}
          </div>
        </div>
      </section>
    );
  }
});

function mapStateToProps(state) {
  return {
    userList: state.user_list.get('list'),
    isFetching: state.user_list.get('status') === FETCHING_STATUS,
    isSaving: state.user_list.get('status') === SUBMITTING_STATUS
  };
}

export const UserPanelContainer = connect(mapStateToProps)(UserPanel);
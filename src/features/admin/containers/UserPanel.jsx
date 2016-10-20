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
import UserFilter from '../components/UserFilter.jsx';

export const UserPanel = React.createClass({
  mixins: [PureRenderMixin],
  getInitialState: function() {
    return {
      filter: {
        firstName: '',
        lastName: '',
        email: ''
      }
    };
  },
  componentWillMount: function() {
    this.props.dispatch(fetchUserListAction());
  },
  onGrantAdminPrivilege: function(userId) {
    this.props.dispatch(submitUpdateAdminPrivilegeAction(userId, true));
  },
  onDenyAdminPrivilege: function(userId) {
    this.props.dispatch(submitUpdateAdminPrivilegeAction(userId, false));
  },
  onFilter: function(filter) {
    this.setState({filter});
  },
  userListFilter: function(user) {
    let output = true;

    if(!!this.state.filter.firstName) {
      output = output && user.get('first_name').includes(this.state.filter.firstName);
    }

    if(!!this.state.filter.lastName) {
      output = output && user.get('last_name').includes(this.state.filter.lastName);
    }

    if(!!this.state.filter.email) {
      output = output && user.get('email').includes(this.state.filter.email);
    }

    return output;
  },
  render: function() {
    const userList = this.props.userList.toList().filter(this.userListFilter);
    return(
      <section className="admin-panel">
        <div className="row">
          <div className="col-md-12 text-center">
            <h3>Administrar usuarios</h3>
          </div>
        </div>
        <div className="row">
          {this.props.isFetching ?
            false :
            <div className="col-md-12">
              <UserFilter onFilter={this.onFilter} />
            </div>}
          <div className="col-md-12 text-center">
            {this.props.isFetching ?
              <ThreeBounce /> :
              userList.size > 0 ?
                <UserList
                  users={userList}
                  isSaving={this.props.isSaving}
                  onGrantAdminPrivilege={this.onGrantAdminPrivilege}
                  onDenyAdminPrivilege={this.onDenyAdminPrivilege} /> :
                <p>No hemos encontrado usuarios de acuerdo a esa búsqueda, intentalo refinando los parámetros.</p>}
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
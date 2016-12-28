import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { ThreeBounce } from 'better-react-spinkit';

import {
  fetchUserListAction,
  submitUpdateAdminPrivilegeAction,
  submitUpdateAuthorPrivilegeAction
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
    const pageSize = 30;
    return {
      pageSize: pageSize,
      itemsToTake: pageSize,
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
  onGrantAuthorPrivilege: function(userId) {
    this.props.dispatch(submitUpdateAuthorPrivilegeAction(userId, true));
  },
  onDenyAuthorPrivilege: function(userId) {
    this.props.dispatch(submitUpdateAuthorPrivilegeAction(userId, false));
  },
  onFilter: function(filter) {
    this.setState({
      filter,
      itemsToTake: this.state.pageSize
    });
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
  handleLoadMoreUsers: function() {
    this.setState({
      itemsToTake: this.state.itemsToTake + this.state.pageSize
    });
  },
  render: function() {
    const filteredUserList = this.props.userList.toList().filter(this.userListFilter);
    const slicedUserList = filteredUserList.slice(0, this.state.itemsToTake);
    const showLoadMore = filteredUserList.size > this.state.itemsToTake;

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
              filteredUserList.size > 0 ?
                <UserList
                  users={slicedUserList}
                  isSaving={this.props.isSaving}
                  onGrantAuthorPrivilege={this.onGrantAuthorPrivilege}
                  onDenyAuthorPrivilege={this.onDenyAuthorPrivilege}
                  onGrantAdminPrivilege={this.onGrantAdminPrivilege}
                  onDenyAdminPrivilege={this.onDenyAdminPrivilege} /> :
                <p>No hemos encontrado usuarios de acuerdo a esa búsqueda, intentalo refinando los parámetros.</p>}
          </div>
          {!this.props.isFetching && showLoadMore ?
            <div className="col-xs-12 col-md-offset-4 col-md-4 text-center">
              <button
                className="btn btn-default btn-block"
                onClick={this.handleLoadMoreUsers}>
                Cargar más
              </button>
            </div> :
            false}
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
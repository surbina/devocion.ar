import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { syncHistoryWithStore, routerActions } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { baseHistory } from './history.js';
import store from './store.js';

import { AppContainer } from './features/app/containers/App';
import { DevotionalContainer } from './features/devotional-view/containers/Devotional';
import { AdminPanelContainer } from './features/admin/containers/AdminPanel.jsx';
import { DevotionalAddContainer } from './features/admin/containers/DevotionalAdd';
import { DevotionalEditContainer } from './features/admin/containers/DevotionalEdit';
import { SignUpContainer } from './features/auth/containers/SignUp';
import { SignInContainer } from './features/auth/containers/SignIn';
import { ResetPasswordContainer } from './features/auth/containers/ResetPassword';

import {
  SIGNING_IN_STATUS,
  VALID_USER_STATUS,
  FETCHING_USER_DATA_STATUS,
  SIGNED_USER_STATUS,
  ANONYMOUS_USER_STATUS,
  SENDING_RESET_PASSWORD_MAIL_STATUS
} from './reducers/user/reducer.js'

const history = syncHistoryWithStore(baseHistory, store);

const UserIsAdmin = UserAuthWrapper({
  authSelector: state => state.user,
  authenticatingSelector: state => state.user.get('status') === SIGNING_IN_STATUS || state.user.get('status') === VALID_USER_STATUS || state.user.get('status') === FETCHING_USER_DATA_STATUS,
  redirectAction: routerActions.replace,
  failureRedirectPath: '/',
  wrapperDisplayName: 'UserIsAdmin',
  predicate: user => user.get('status') === SIGNED_USER_STATUS && user.get('is_admin'),
  allowRedirectBack: false
})

const UserIsNotAuthenticated = UserAuthWrapper({
  authSelector: state => state.user,
  redirectAction: routerActions.replace,
  failureRedirectPath: '/',
  wrapperDisplayName: 'UserIsNotAuthenticated',
  predicate: user => user.get('status') === ANONYMOUS_USER_STATUS || user.get('status') === SIGNING_IN_STATUS || user.get('status') === SENDING_RESET_PASSWORD_MAIL_STATUS,
  allowRedirectBack: false
})

const routes = <Route path="/" component={AppContainer}>
  <IndexRoute component={DevotionalContainer}/>
  <Route path="admin">
    <IndexRoute component={UserIsAdmin(AdminPanelContainer)}/>
    <Route path="devotional">
      <Route path="add" component={UserIsAdmin(DevotionalAddContainer)}></Route>
      <Route path="edit/:devotionalPublishDate" component={UserIsAdmin(DevotionalEditContainer)}></Route>
    </Route>
  </Route>
  <Route path="sign">
    <Route path="up" component={UserIsNotAuthenticated(SignUpContainer)}/>
    <Route path="in" component={UserIsNotAuthenticated(SignInContainer)}/>
  </Route>
  <Route path="reset-password"  component={UserIsNotAuthenticated(ResetPasswordContainer)}/>
</Route>;

export default React.createClass({
  render: function() {
    return <Router history={history} routes={routes} />;
  }
});
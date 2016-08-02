import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { syncHistoryWithStore, routerActions } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { baseHistory } from './history.js';
import store from './store.js';

import { AppContainer } from './containers/App';
import { DevotionalContainer } from './containers/Devotional';
import { AdminPanelContainer } from './containers/AdminPanel';
import { DevotionalAddContainer } from './containers/DevotionalAdd';
import { SignUpContainer } from './containers/SignUp';
import { SignInContainer } from './containers/SignIn';

import { SIGNED_USER_STATUS } from './reducers/user/reducer.js'

const history = syncHistoryWithStore(baseHistory, store);

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.user,
  redirectAction: routerActions.replace,
  failureRedirectPath: '/sign/in',
  wrapperDisplayName: 'UserIsAuthenticated',
  predicate: user => user.get('status') === SIGNED_USER_STATUS
})

const routes = <Route path="/" component={AppContainer}>
  <IndexRoute component={DevotionalContainer}/>
  <Route path="admin">
    <IndexRoute component={UserIsAuthenticated(AdminPanelContainer)}/>
    <Route path="devotional/add" component={UserIsAuthenticated(DevotionalAddContainer)}></Route>
  </Route>
  <Route path="sign">
    <Route path="up" component={SignUpContainer}/>
    <Route path="in" component={SignInContainer}/>
  </Route>
</Route>;

export default React.createClass({
  render: function() {
    return <Router history={history} routes={routes} />;
  }
});
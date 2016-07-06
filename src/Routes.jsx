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

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(baseHistory, store);

// Redirects to /login by default
const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.user, // how to get the user state
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  failureRedirectPath: '/signin',
  wrapperDisplayName: 'UserIsAuthenticated', // a nice name for this auth check
  predicate: user => user.get('status') === 'SIGNED_USER'
})

export default React.createClass({
  render: function() {
    return(
      <Router history={history}>
        <Route path="/" component={AppContainer}>
          <IndexRoute component={DevotionalContainer}/>
          <Route path="admin">
            <IndexRoute component={UserIsAuthenticated(AdminPanelContainer)}/>
            <Route path="devotional/add" component={UserIsAuthenticated(DevotionalAddContainer)}></Route>
          </Route>
          <Route path="signup" component={SignUpContainer}/>
          <Route path="signin" component={SignInContainer}/>
        </Route>
      </Router>
    );
  }
});
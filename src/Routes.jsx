import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  IndexRedirect
} from 'react-router';
import {
  syncHistoryWithStore,
  routerActions
} from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { baseHistory } from './history.js';
import store from './store.js';

import { AppContainer } from './features/app/containers/App.jsx';
import DevotionalNotFound from './features/app/containers/DevotionalNotFound.jsx';
import { DevotionalContainer } from './features/devotional-view/containers/Devotional.jsx';
import { CalendarContainer } from './features/calendar-view/containers/Calendar.jsx';
import { DevotionalPanelContainer } from './features/admin/containers/DevotionalPanel.jsx';
import { UserPanelContainer } from './features/admin/containers/UserPanel.jsx';
import { DevotionalEditContainer } from './features/admin/containers/DevotionalEdit.jsx';
import { SignUpContainer } from './features/auth/containers/SignUp.jsx';
import { SignInContainer } from './features/auth/containers/SignIn.jsx';
import { ResetPasswordContainer } from './features/auth/containers/ResetPassword.jsx';
import AuthorPanel from './features/author/containers/AuthorPanel.jsx';
import { AuthorDevotionalAddContainer } from './features/author/containers/AuthorDevotionalAdd.jsx';
import { AuthorDevotionalEditContainer } from './features/author/containers/AuthorDevotionalEdit.jsx';

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

const UserIsAuthor = UserAuthWrapper({
  authSelector: state => state.user,
  authenticatingSelector: state => state.user.get('status') === SIGNING_IN_STATUS || state.user.get('status') === VALID_USER_STATUS || state.user.get('status') === FETCHING_USER_DATA_STATUS,
  redirectAction: routerActions.replace,
  failureRedirectPath: '/',
  wrapperDisplayName: 'UserIsAuthor',
  predicate: user => user.get('status') === SIGNED_USER_STATUS && user.get('is_author'),
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

function makeRoutes() {
  return(
    <Route path="/" component={AppContainer}>
      <IndexRedirect to="/devotional" />
      <Route path="devotional(/:devotionalPublishDate)" component={DevotionalContainer} />
      <Route path="devotional-not-found" component={DevotionalNotFound} />
      <Route path="calendar" component={CalendarContainer} />
      
      <Route path="author">
        <IndexRoute component={UserIsAuthor(AuthorPanel)} />
        <Route path="devotional">
          <Route path="add" component={UserIsAuthor(AuthorDevotionalAddContainer)} />
          <Route path="edit/:devotionalId" component={UserIsAuthor(AuthorDevotionalEditContainer)} />
        </Route>
      </Route>

      <Route path="admin">
        <IndexRoute component={UserIsAdmin(DevotionalPanelContainer)}/>
        <Route path="devotional">
          <Route path="edit/:devotionalId" component={UserIsAdmin(DevotionalEditContainer)}></Route>
        </Route>
        <Route path="user" component={UserIsAdmin(UserPanelContainer)} />
      </Route>

      <Route path="sign">
        <Route path="up" component={UserIsNotAuthenticated(SignUpContainer)}/>
        <Route path="in" component={UserIsNotAuthenticated(SignInContainer)}/>
      </Route>

      <Route path="reset-password"  component={UserIsNotAuthenticated(ResetPasswordContainer)}/>
    </Route>
  );
}

export default React.createClass({
  render: function() {
    return <Router history={history} routes={makeRoutes()} />;
  }
});
import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { AppContainer } from './containers/App';
import { DevotionalContainer } from './containers/Devotional';
import { AdminPanelContainer } from './containers/AdminPanel';
import { DevotionalAddContainer } from './containers/DevotionalAdd';
import { SignUpContainer } from './containers/SignUp';
import { SignInContainer } from './containers/SignIn';

export default React.createClass({
  render: function() {
    return(
      <Router history={hashHistory}>
        <Route path="/" component={AppContainer}>
          <IndexRoute component={DevotionalContainer}/>
          <Route path="/admin">
            <IndexRoute component={AdminPanelContainer}/>
            <Route path="/admin/devotional/add" component={DevotionalAddContainer}></Route>
          </Route>
          <Route path="/signup" component={SignUpContainer}/>
          <Route path="/signin" component={SignInContainer}/>
        </Route>
      </Router>
    );
  }
});
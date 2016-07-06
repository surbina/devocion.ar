import React from 'react';
import { Router, Route, IndexRoute, hashHistory  } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store.js';

import { AppContainer } from './containers/App';
import { DevotionalContainer } from './containers/Devotional';
import { AdminPanelContainer } from './containers/AdminPanel';
import { DevotionalAddContainer } from './containers/DevotionalAdd';
import { SignUpContainer } from './containers/SignUp';
import { SignInContainer } from './containers/SignIn';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, store);

export default React.createClass({
  render: function() {
    return(
      <Router history={history}>
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
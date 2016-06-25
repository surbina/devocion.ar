import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { AppContainer } from './containers/App/Container';
import { DevotionalContainer } from './containers/Devotional/Container';
import { AdminPanelContainer } from './containers/AdminPanel';
import DevotionalAdd from './containers/DevotionalAdd';

export default React.createClass({
  render: function() {
    return(
      <Router history={hashHistory}>
        <Route path="/" component={AppContainer}>
          <IndexRoute component={DevotionalContainer}/>
          <Route path="/admin">
            <IndexRoute component={AdminPanelContainer}/>
            <Route path="/admin/devotional/add" component={DevotionalAdd}></Route>
          </Route>
        </Route>
      </Router>
    );
  }
});
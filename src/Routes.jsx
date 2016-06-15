import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import App from './components/App';
import DevotionalAdd from './components/DevotionalAdd';

export default React.createClass({
  render: function() {
    return(
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="/admin/devotional/add" component={DevotionalAdd}>
          </Route>
        </Route>
      </Router>
    );
  }
});
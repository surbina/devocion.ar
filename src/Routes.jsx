import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './components/App';
import Devotional from './containers/Devotional';
import AdminPanel from './containers/AdminPanel';
import DevotionalAdd from './containers/DevotionalAdd';

export default React.createClass({
  render: function() {
    return(
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Devotional}/>
          <Route path="/admin" component={AdminPanel}></Route>
          <Route path="/admin/devotional/add" component={DevotionalAdd}></Route>
        </Route>
      </Router>
    );
  }
});
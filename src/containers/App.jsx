import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import NavBar from '../components/NavBar';

export const App = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return(
      <div className="container-fluid">
        <NavBar />

        {this.props.children}
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {};
}    

export const AppContainer = connect(mapStateToProps)(App);
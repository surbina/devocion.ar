import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import NavBar from '../../components/NavBar';

import { setStateAction } from './actions.js';

export const App = React.createClass({
  mixins: [PureRenderMixin],
  componentWillMount: function() {
    this.props.dispatch(setStateAction({
      devotional_list: {
      },
      home_section: {
      },
      admin_section: {
        admin_panel: {},
        add_devotional: {}
      }
    }));
  },
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
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import DevotionalForm from './../components/DevotionalForm.jsx';

import { fetchDevotionalListAction } from './../../../reducers/devotional_list/actions.js';

export const DevotionalAdd = React.createClass({
  mixins: [PureRenderMixin],
  handleDevotionalSubmit: function (devotional) {
    this.props.dispatch(postDevotionalAction(devotional));
  },
  render: function() {
    return(
      <DevotionalForm onDevotionalSubmit={this.handleDevotionalSubmit} user={this.props.user}/>
    );
  }
});

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export const DevotionalAddContainer = connect(mapStateToProps)(DevotionalAdd);
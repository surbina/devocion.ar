import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import DevotionalForm from '../../components/DevotionalForm';

import { postDevotionalAction } from '../../reducers/devotional_list/actions.js';

export const DevotionalAdd = React.createClass({
  mixins: [PureRenderMixin],
  handleDevotionalSubmit: function (devotional) {
    this.props.dispatch(postDevotionalAction(devotional));
  },
  render: function() {
    return(
      <div className="container">
        <DevotionalForm onDevotionalSubmit={this.handleDevotionalSubmit}/>
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {};
}

export const DevotionalAddContainer = connect(mapStateToProps)(DevotionalAdd);
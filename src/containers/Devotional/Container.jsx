import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import DevotionalContent from '../../components/DevotionalContent';
import DevotionalComment from '../../components/DevotionalComment';
import { fromJS } from 'immutable';

import { fetchDevotionalAction } from './actions.js';

export const Devotional = React.createClass({
  mixins: [PureRenderMixin],
  componentDidMount: function() {
    this.props.dispatch(fetchDevotionalAction(1));
  },
  render: function() {
    return(
      <main className="container">
        <DevotionalContent devotional={this.props.devotional} />
        <DevotionalComment />
      </main>
    );
  }
});

function mapStateToProps(state) {
  const currentPublicationId = state.getIn(['home_section', 'current_devotional']);

  return {
    devotional: state.getIn(['devotional_list', currentPublicationId])
  };
}    

export const DevotionalContainer = connect(mapStateToProps)(Devotional);
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import DevotionalContent from '../components/DevotionalContent';
import DevotionalComment from '../components/DevotionalComment';

import { fetchDevotionalAction } from '../reducers/devotional_list/actions.js';
import { loadDevotionalAction } from '../reducers/home_section/actions.js';

export const Devotional = React.createClass({
  mixins: [PureRenderMixin],
  componentDidMount: function() {
    this.props.dispatch(loadDevotionalAction('-KNsRDIygJ8_c6YYPnmq'));
    this.props.dispatch(fetchDevotionalAction('-KNsRDIygJ8_c6YYPnmq'));
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
  const currentPublicationId = state.home_section.get('current_devotional_id');
  return {
    devotional: state.devotional_list.get(currentPublicationId)
  };
}    

export const DevotionalContainer = connect(mapStateToProps)(Devotional);
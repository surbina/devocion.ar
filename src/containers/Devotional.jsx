import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import DevotionalContent from '../components/DevotionalContent';
import DevotionalComment from '../components/DevotionalComment';
import { fethLastDevotionalAction } from '../reducers/home_section/actions.js';

export const Devotional = React.createClass({
  mixins: [PureRenderMixin],
  componentDidMount: function() {
    this.props.dispatch(fethLastDevotionalAction());
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
  const currentPublicationPublishDate = state.home_section.get('current_devotional_publish_date');
  return {
    devotional: state.devotional_list.get(currentPublicationPublishDate)
  };
}    

export const DevotionalContainer = connect(mapStateToProps)(Devotional);
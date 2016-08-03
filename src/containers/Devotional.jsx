import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import DevotionalContent from '../components/DevotionalContent.jsx';
import { DevotionalCommentContainer } from '../containers/DevotionalComment.jsx';
import {
  fetchLastDevotionalAction,
  fetchNextDevotionalAction,
  fetchPreviousDevotionalAction
} from '../reducers/home_section/actions.js';

export const Devotional = React.createClass({
  mixins: [PureRenderMixin],
  componentDidMount: function () {
    this.props.dispatch(fetchLastDevotionalAction());
  },
  handleNextDevotional: function () {
    this.props.dispatch(fetchNextDevotionalAction(this.props.devotional.get('publish_date')));
  },
  handlePreviousDevotional: function () {
    this.props.dispatch(fetchPreviousDevotionalAction(this.props.devotional.get('publish_date')));
  },
  render: function() {
    return(
      <main className="container">
        <DevotionalContent
          devotional={this.props.devotional}
          onHandleNextDevotional={this.handleNextDevotional}
          onHandlePreviousDevotional={this.handlePreviousDevotional}/>
        <DevotionalCommentContainer devotional={this.props.devotional}/>
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
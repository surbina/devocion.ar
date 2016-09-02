import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import moment from 'moment';
import { ThreeBounce } from 'better-react-spinkit';

import DevotionalContent from '../components/DevotionalContent.jsx';
import { DevotionalCommentContainer } from './DevotionalComment.jsx';
import {
  loadCurrentDevotionalAction,
  loadPrevDevotionalAction
} from '../../../reducers/home_section/actions.js';
import { fetchDevotionalAction } from '../../../reducers/devotional_list/actions.js';

import {
  LOADING_DEVOTIONAL_STATUS
} from '../../../reducers/home_section/reducer.js';

export const Devotional = React.createClass({
  mixins: [PureRenderMixin],
  componentDidMount: function () {
    const devotionalDate = this.props.params.devotionalPublishDate ?
      this.props.params.devotionalPublishDate :
      moment().format('YYYY-MM-DD');
    this.props.dispatch(loadCurrentDevotionalAction(devotionalDate));
  },
  componentWillReceiveProps: function(nextProps) {
    //console.log('Next props: ', nextProps);
  },
  handleNextDevotional: function () {
    //this.props.dispatch(fetchNextDevotionalAction(this.props.devotional.get('publish_date')));
  },
  handlePreviousDevotional: function () {
    this.props.dispatch(loadPrevDevotionalAction(this.props.devotional.get('publish_date')));
  },
  render: function() {
    return(
      this.props.loadingDevotional ?
        <div className="row">
          <div className="col-md-12 text-center">
            <h4>Cargando devocional <ThreeBounce /></h4>
          </div>
        </div> :
        <div>
            <DevotionalContent
              devotional={this.props.devotional}
              onHandleNextDevotional={this.handleNextDevotional}
              onHandlePreviousDevotional={this.handlePreviousDevotional}/>
            <DevotionalCommentContainer devotional={this.props.devotional}/>
        </div>
    );
  }
});

function mapStateToProps(state) {
  const currentPublicationPublishDate = state.home_section.get('current_devotional_publish_date');
  return {
    devotional: state.devotional_list.get(currentPublicationPublishDate),
    loadingDevotional: state.home_section.get('status') === LOADING_DEVOTIONAL_STATUS
  };
}

export const DevotionalContainer = connect(mapStateToProps)(Devotional);
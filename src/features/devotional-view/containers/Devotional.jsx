import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import moment from 'moment';
import { ThreeBounce } from 'better-react-spinkit';
import { Map } from 'immutable';

import DevotionalContent from '../components/DevotionalContent.jsx';
import { DevotionalCommentContainer } from './DevotionalComment.jsx';
import {
  loadCurrentOrPreviousDevotionalAction,
  loadCurrentOrNextDevotionalAction
} from '../../../reducers/devotional_view_section/actions.js';

import {
  LOADING_DEVOTIONAL_STATUS
} from '../../../reducers/devotional_view_section/reducer.js';

export const Devotional = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    devotional: React.PropTypes.instanceOf(Map),
    loadingDevotional: React.PropTypes.bool.isRequired
  },
  componentDidMount: function () {
    const devotionalDate = this.props.params.devotionalPublishDate ?
      this.props.params.devotionalPublishDate :
      moment().format('YYYY-MM-DD');
    this.props.dispatch(loadCurrentOrPreviousDevotionalAction(devotionalDate));
  },
  componentWillReceiveProps: function(nextProps) {
    if(nextProps.params.devotionalPublishDate !== this.props.params.devotionalPublishDate &&
      nextProps.params.devotionalPublishDate !== this.props.devotional.get('publish_date')) {
      const oldDate = moment(this.props.devotional.get('publish_date'));
      const newDate = nextProps.params.devotionalPublishDate ?
        moment(nextProps.params.devotionalPublishDate) :
        moment();

      if(newDate.isSameOrBefore(oldDate, 'day') || nextProps.params.devotionalPublishDate === undefined) {
        this.props.dispatch(loadCurrentOrPreviousDevotionalAction(newDate.format('YYYY-MM-DD')));
      }
      else {
        this.props.dispatch(loadCurrentOrNextDevotionalAction(newDate.format('YYYY-MM-DD')));
      }
    }
  },
  render: function() {
    return(
      this.props.loadingDevotional ?
        <div className="row">
          <div className="col-md-12 text-center">
            <h4>Cargando devocional <ThreeBounce /></h4>
          </div>
        </div> :
        <article>
            <DevotionalContent devotional={this.props.devotional} />
            <DevotionalCommentContainer devotional={this.props.devotional} />
        </article>
    );
  }
});

function mapStateToProps(state) {
  const currentDevotionalId = state.devotional_view_section.get('current_devotional_id');

  return {
    devotional: state.devotional_list.getIn(['devotional', currentDevotionalId]),
    loadingDevotional: state.devotional_view_section.get('status') === LOADING_DEVOTIONAL_STATUS
  };
}

export const DevotionalContainer = connect(mapStateToProps)(Devotional);
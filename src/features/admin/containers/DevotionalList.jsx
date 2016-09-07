import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { ThreeBounce } from 'better-react-spinkit';

import {
  fetchDevotionalListAction,
  deleteDevotionalAction
} from '../../../reducers/devotional_list/actions.js';
import { REDUCER_FETCHING_LIST_STATUS } from '../../../reducers/devotional_list/reducer.js';

import DevotionalItem from '../components/DevotionalItem.jsx';

export const DevotionalList = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    isLoadingDevotional: React.PropTypes.bool.isRequired,
    devotionals: React.PropTypes.instanceOf(List).isRequired
  },
  componentDidMount: function() {
    this.props.dispatch(fetchDevotionalListAction());
  },
  getDevotionals: function() {
    return this.props.devotionals || [];
  },
  handleDevotionalDelete: function(devotional) {
    this.props.dispatch(deleteDevotionalAction(devotional));
  },
  devotionalComparator: function(devA, devB) {
    return -devA.get('publish_date').localeCompare(devB.get('publish_date'));
  },
  render: function() {
    return(
      this.props.isLoadingDevotional ?
        <h4 className="text-center">Cargando devocionales <ThreeBounce /></h4> :
        <div>
          {this.getDevotionals().toArray().sort(this.devotionalComparator).map(devotional =>
            <DevotionalItem
              key={devotional.get('id')}
              devotional={devotional}
              onDevotionalDelete={this.handleDevotionalDelete} />
          )}
        </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    isLoadingDevotional: state.devotional_list.get('status') === REDUCER_FETCHING_LIST_STATUS,
    devotionals: state.devotional_list.delete('status').delete('currently_devotional_working_date').toList()
  };
}

export const DevotionalListContainer = connect(mapStateToProps)(DevotionalList);
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { ThreeBounce } from 'better-react-spinkit';

import {
  fetchAdminDevotionalPageAction,
  deleteDevotionalAction
} from '../../../reducers/devotional_list/actions.js';
import { REDUCER_FETCHING_PAGE_STATUS } from '../../../reducers/devotional_list/reducer.js';

import DevotionalItem from '../components/DevotionalItem.jsx';

export const DevotionalList = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    isLoadingDevotional: React.PropTypes.bool.isRequired,
    devotionals: React.PropTypes.instanceOf(List).isRequired
  },
  componentDidMount: function() {
    this.props.dispatch(fetchAdminDevotionalPageAction(this.props.lastDevotionalPageDate));
  },
  getDevotionals: function() {
    return this.props.devotionals || [];
  },
  handleDevotionalDelete: function(devotional) {
    this.props.dispatch(deleteDevotionalAction(devotional));
  },
  handleLoadMoreDevotional: function() {
    this.props.dispatch(fetchAdminDevotionalPageAction(this.props.lastDevotionalPageDate));
  },
  devotionalComparator: function(devA, devB) {
    if(!devA.get('publish_date')) {
      return -1;
    } else if(!devB.get('publish_date')) {
      return 1;
    }
    
    return -1 * devA.get('publish_date').localeCompare(devB.get('publish_date'));
  },
  render: function() {
    return(
      this.props.isLoadingDevotional && !this.props.lastDevotionalPageDate ?
        <div className="row">
          <div className="col-xs-12 text-center">
            <h4>Cargando devocionales <ThreeBounce /></h4>
          </div>
        </div> :
        <div className="row">
          <div className="col-xs-12">
            {this.getDevotionals().toArray().sort(this.devotionalComparator).map(devotional =>
              <DevotionalItem
                key={devotional.get('id')}
                devotional={devotional}
                onDevotionalDelete={this.handleDevotionalDelete} />
            )}
          </div>
          <div className="col-xs-12 col-md-offset-4 col-md-4 text-center">
            {this.props.isLoadingDevotional ?
              <ThreeBounce /> :
              <button className="btn btn-default btn-block" onClick={this.handleLoadMoreDevotional}>Cargar más</button>}
          </div>
        </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    isLoadingDevotional: state.devotional_list.get('status') === REDUCER_FETCHING_PAGE_STATUS,
    devotionals: state.devotional_list.get('devotional').toList(),
    lastDevotionalPageDate: state.devotional_list.get('last_devotional_page_date')
  };
}

export const DevotionalListContainer = connect(mapStateToProps)(DevotionalList);
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { ThreeBounce } from 'better-react-spinkit';

import {
  fetchAdminDevotionalPageAction,
  publishDevotionalAction,
  unpublishDevotionalAction,
  deleteDevotionalAction
} from '../../../reducers/devotional_list/actions.js';
import {
  REDUCER_FETCHING_PAGE_STATUS,
  DRAFT_DEVOTIONAL_STATUS
} from '../../../reducers/devotional_list/reducer.js';

import DevotionalItem from '../components/DevotionalItem.jsx';

export const DevotionalList = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    isLoadingDevotional: React.PropTypes.bool.isRequired,
    devotionals: React.PropTypes.instanceOf(List).isRequired
  },
  getInitialState: function() {
    return {
      filter: this.props.filter
    };
  },
  componentDidMount: function() {
    this.props.dispatch(fetchAdminDevotionalPageAction(this.props.lastDevotionalPageDate));
  },
  componentWillReceiveProps: function(nextProps) {
    if(nextProps.filter !== this.state.filter) {
      this.setState({filter: nextProps.filter});
    }
  },
  getDevotionals: function() {
    return this.props.devotionals || [];
  },
  handleDevotionalDelete: function(devotional) {
    this.props.dispatch(deleteDevotionalAction(devotional));
  },
  handleDevotionalPublish: function(devotional) {
    this.props.dispatch(publishDevotionalAction(devotional));
  },
  handleDevotionalUnpublish: function(devotional) {
    this.props.dispatch(unpublishDevotionalAction(devotional));
  },
  handleLoadMoreDevotional: function() {
    this.props.dispatch(fetchAdminDevotionalPageAction(this.props.lastDevotionalPageDate));
  },
  devotionalComparator: function(devA, devB) {
    if(!devA.get('publish_date')) {
      return -1;
    } else if(!devB.get('publish_date')) {
      return 1;
    } else if(devA.get('publish_status') !== devB.get('publish_status')) {
      if(devA.get('publish_status') === DRAFT_DEVOTIONAL_STATUS) {
        return -1;
      } else if(devB.get('publish_status') === DRAFT_DEVOTIONAL_STATUS) {
        return 1;
      }
    }
    
    return -1 * devA.get('publish_date').localeCompare(devB.get('publish_date'));
  },
  devotionalFilter: function(devotional) {
    let output = true;

    if(!!this.state.filter.devotionalName) {
      output = output && devotional.get('title').toLowerCase().includes(this.state.filter.devotionalName.toLowerCase());
    }

    if(!!this.state.filter.authorName) {
      output = output && devotional.get('author_name').toLowerCase().includes(this.state.filter.authorName.toLowerCase());
    }

    if(this.state.filter.publishedStatus !== 'ALL') {
      output = output && devotional.get('publish_status') === this.state.filter.publishedStatus;
    }

    return output;
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
            {this.getDevotionals()
              .toArray()
              .filter(this.devotionalFilter)
              .sort(this.devotionalComparator)
              .map(devotional =>
                <DevotionalItem
                  key={devotional.get('id')}
                  devotional={devotional}
                  onDevotionalPublish={this.handleDevotionalPublish}
                  onDevotionalUnpublish={this.handleDevotionalUnpublish}
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
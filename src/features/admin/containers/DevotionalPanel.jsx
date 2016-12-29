import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';

import DevotionalFilter from '../components/DevotionalFilter.jsx';
import { DevotionalListContainer } from './DevotionalList.jsx';

export const DevotionalPanel = React.createClass({
  mixins: [PureRenderMixin],
  getInitialState: function() {
    return {
      filter: {
        devotionalName: '',
        authorName: '',
        publishedStatus: 'ALL'
      }
    };
  },
  handleFilter: function(filter) {
    this.setState({filter});
  },
  render: function() {
    return(
      <section className="admin-panel">
        <div className="row">
          <div className="col-md-12 text-center">
            <h3>Administrar devocionales</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <DevotionalFilter onFilter={this.handleFilter} />
          </div>
          <div className="col-md-12">
            <DevotionalListContainer filter={this.state.filter} />
          </div>
        </div>
      </section>
    );
  }
});

function mapStateToProps(state) {
  return {};
}

export const DevotionalPanelContainer = connect(mapStateToProps)(DevotionalPanel);
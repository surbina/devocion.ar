require('./AdminPanel.scss');

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import { Map } from 'immutable';
import { ThreeBounce } from 'better-react-spinkit';

import DevotionalItem from './../components/DevotionalItem.jsx';

import {
  fetchDevotionalListAction,
  deleteDevotionalAction
} from './../../../reducers/devotional_list/actions.js';

export const AdminPanel = React.createClass({
  mixins: [PureRenderMixin],
  componentDidMount: function() {
    this.props.dispatch(fetchDevotionalListAction());
  },
  getDevotionals: function() {
    return this.props.devotionals || Map();
  },
  handleDevotionalDelete: function(devotional) {
    this.props.dispatch(deleteDevotionalAction(devotional));
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
          <div className="col-md-12 text-right">
            <Link to="/admin/devotional/add" className="btn btn-default action-button">Nuevo devocional</Link>
          </div>
        </div>
        <div className="row">
          {this.props.isLoadingDevotional ?
            <div className="col-md-12 text-center">
              <h4>Cargando devocionales <ThreeBounce /></h4>
            </div> :
            <div className="col-md-12">
              {this.getDevotionals().valueSeq().map(devotional =>
                <DevotionalItem
                  key={devotional.get('id')}
                  devotional={devotional}
                  onDevotionalDelete={this.handleDevotionalDelete} />
              )}
            </div>}
        </div>
      </section>
    );
  }
});

function mapStateToProps(state) {
  return {
    isLoadingDevotional: state.devotional_list.get('fetching_list'),
    devotionals: state.devotional_list.delete('fetching_list').delete('status').toList()
  };
}

export const AdminPanelContainer = connect(mapStateToProps)(AdminPanel);
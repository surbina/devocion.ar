import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import DevotionalList from '../components/DevotionalList';
import { Link } from 'react-router';
import { fromJS } from 'immutable';

import { fetchDevotionalListAction } from '../reducers/devotional_list/actions.js';

export const AdminPanel = React.createClass({
  mixins: [PureRenderMixin],
  componentDidMount: function() {
    this.props.dispatch(fetchDevotionalListAction());
  },
  render: function() {
    return(
      <div>
        <section className="row">
          <div className="col-md-12">
            <Link to="/admin/devotional/add" className="btn btn-default">Nuevo devocional</Link>
          </div>
        </section>
        <section className="row">
          <div className="col-md-12">
            <DevotionalList devotionals={this.props.devotionals} />
          </div>
        </section>
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    devotionals: state.devotional_list.delete('fetching_list').toList()
  };
}

export const AdminPanelContainer = connect(mapStateToProps)(AdminPanel);
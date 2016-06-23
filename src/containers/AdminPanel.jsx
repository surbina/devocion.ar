import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import DevotionalList from '../components/DevotionalList';
import { Link } from 'react-router';
import { fromJS } from 'immutable';

export const AdminPanel = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link to="/admin/devotional/add" className="btn btn-default">Nuevo devocional</Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <DevotionalList devotionals={this.props.devotionals} />
          </div>
        </div>
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    devotionals: state.get('devotional_list').toList()
  };
}

export const AdminPanelContainer = connect(mapStateToProps)(AdminPanel);
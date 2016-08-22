import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import DevotionalForm from './../components/DevotionalForm.jsx';

import { FETCHING_STATUS } from './../../../reducers/devotional_list/reducer.js';
import { editDevotional } from './../../../reducers/admin/actions.js';
import {
  fetchDevotionalAction,
  putDevotionalAction
} from './../../../reducers/devotional_list/actions.js';

export const DevotionalEdit = React.createClass({
  mixins: [PureRenderMixin],
  componentWillMount: function() {
    this.props.dispatch(fetchDevotionalAction(this.props.params.devotionalPublishDate));
    this.props.dispatch(editDevotional(this.props.params.devotionalPublishDate));
  },
  handleDevotionalSubmit: function (devotional) {
    this.props.dispatch(putDevotionalAction(devotional));
  },
  render: function() {
    return(
      <section>
        <div className="row">
          <div className="col-md-12 text-center">
            <h3>Editar devocional</h3>
          </div>
        </div>
        {this.props.devotional === undefined || this.props.devotional.status === FETCHING_STATUS ?
          <div className="row">
            <div className="col-md-12 text-center">
              <h5>Cargando devocional ...</h5>
            </div>
          </div> :
          <DevotionalForm
            model={this.props.devotional}
            user={this.props.user}
            onDevotionalSubmit={this.handleDevotionalSubmit} />}
      </section>
    );
  }
});

function mapStateToProps(state) {
  const devotional = state.devotional_list.get(state.admin.get('editingDevotional')) ? state.devotional_list.get(state.admin.get('editingDevotional')).toJS() : undefined;
  return {
    user: state.user,
    devotional: devotional
  };
}

export const DevotionalEditContainer = connect(mapStateToProps)(DevotionalEdit);
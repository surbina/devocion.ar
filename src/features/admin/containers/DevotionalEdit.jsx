import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { ThreeBounce } from 'better-react-spinkit';

import DevotionalForm from '../../../components/devotional-form/DevotionalForm.jsx';
import {
  SUBMITTING_STATUS,
  FETCHING_STATUS
} from './../../../reducers/devotional_list/reducer.js';
import { editDevotional } from './../../../reducers/admin_section/actions.js';
import {
  fetchPrevDevotionalAction,
  putDevotionalAction
} from './../../../reducers/devotional_list/actions.js';

export const DevotionalEdit = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    user: React.PropTypes.instanceOf(Map).isRequired,
    devotional: React.PropTypes.object
  },
  componentWillMount: function() {
    this.props.dispatch(fetchPrevDevotionalAction(this.props.params.devotionalPublishDate));
    this.props.dispatch(editDevotional(this.props.params.devotionalPublishDate));
  },
  handleDevotionalSubmit: function (devotional) {
    this.props.dispatch(putDevotionalAction(devotional, '/admin'));
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
              <h5>Cargando devocional <ThreeBounce /></h5>
            </div>
          </div> :
          <DevotionalForm
            model={this.props.devotional}
            user={this.props.user}
            onDevotionalSubmit={this.handleDevotionalSubmit}
            isSaving={this.props.devotional.status === SUBMITTING_STATUS}
            showPublishDate={true} />}
      </section>
    );
  }
});

function mapStateToProps(state) {
  const devotional = state.devotional_list.get(state.admin_section.get('editing_devotional')) ? state.devotional_list.get(state.admin_section.get('editing_devotional')).toJS() : undefined;
  return {
    user: state.user,
    devotional: devotional
  };
}

export const DevotionalEditContainer = connect(mapStateToProps)(DevotionalEdit);
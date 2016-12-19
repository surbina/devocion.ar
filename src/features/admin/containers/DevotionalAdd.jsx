import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import DevotionalForm from '../../../components/devotional-form/DevotionalForm.jsx';

import { postDevotionalAction } from './../../../reducers/devotional_list/actions.js';
import { SUBMITTING_STATUS } from './../../../reducers/devotional_list/reducer.js';

export const DevotionalAdd = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    user: React.PropTypes.instanceOf(Map).isRequired,
    isSavingDevotional: React.PropTypes.bool.isRequired
  },
  handleDevotionalSubmit: function (devotional) {
    this.props.dispatch(postDevotionalAction(devotional, '/admin'));
  },
  render: function() {
    const devotionalModel = {
      id: '-1',
      title: '',
      passage: '',
      publish_date: '',
      body: '',
      author_name: '',
      author_id: '',
      creation_date: ''
    };

    return(
      <section>
        <div className="row">
          <div className="col-md-12 text-center">
            <h3>Nuevo devocional</h3>
          </div>
        </div>
        <DevotionalForm
          model={devotionalModel}
          user={this.props.user}
          onDevotionalSubmit={this.handleDevotionalSubmit}
          isSaving={this.props.isSavingDevotional} />
      </section>
    );
  }
});

function mapStateToProps(state) {
  return {
    user: state.user,
    isSavingDevotional: !!state.devotional_list.get('-1') && state.devotional_list.get('status') === SUBMITTING_STATUS
  };
}

export const DevotionalAddContainer = connect(mapStateToProps)(DevotionalAdd);
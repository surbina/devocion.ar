import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import DevotionalForm from './../components/DevotionalForm.jsx';

import { postDevotionalAction } from './../../../reducers/devotional_list/actions.js';

export const DevotionalAdd = React.createClass({
  mixins: [PureRenderMixin],
  handleDevotionalSubmit: function (devotional) {
    this.props.dispatch(postDevotionalAction(devotional));
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
          onDevotionalSubmit={this.handleDevotionalSubmit} />
      </section>
    );
  }
});

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export const DevotionalAddContainer = connect(mapStateToProps)(DevotionalAdd);
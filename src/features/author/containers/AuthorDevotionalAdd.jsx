import React from 'react';
import { connect } from 'react-redux';

import DevotionalForm from '../../../components/devotional-form/DevotionalForm.jsx';

import { postDevotionalAction } from './../../../reducers/devotional_list/actions.js';
import {
  SUBMITTING_STATUS,
  DRAFT_DEVOTIONAL_STATUS
} from './../../../reducers/devotional_list/reducer.js';

class AuthorDevotionalAdd extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleDevotionalSubmit = this._handleDevotionalSubmit.bind(this);
  }

  _handleDevotionalSubmit(devotional) {
    this.props.dispatch(postDevotionalAction(devotional, '/author'));
  }

  render() {
    const devotionalModel = {
      id: '-1',
      title: '',
      passage: '',
      publish_date: '',
      publish_status: DRAFT_DEVOTIONAL_STATUS,
      body: '',
      author_name: '',
      author_id: '',
      creation_date: '',
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
}

function mapStateToProps(state) {
  return {
    user: state.user,
    isSavingDevotional: !!state.devotional_list.get('-1') && state.devotional_list.get('status') === SUBMITTING_STATUS
  };
}

export default AuthorDevotionalAdd;
export const AuthorDevotionalAddContainer = connect(mapStateToProps)(AuthorDevotionalAdd);
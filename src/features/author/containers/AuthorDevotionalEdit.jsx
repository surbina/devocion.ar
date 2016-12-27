import React from 'react';
import { connect } from 'react-redux';
import { ThreeBounce } from 'better-react-spinkit';

import DevotionalForm from '../../../components/devotional-form/DevotionalForm.jsx';
import {
  SUBMITTING_STATUS,
  FETCHING_STATUS
} from './../../../reducers/devotional_list/reducer.js';
import {
  fetchDevotionalByIdAction,
  putDevotionalAction
} from './../../../reducers/devotional_list/actions.js';

import {
  authorEditDevotional,
  authorResetEditDevotional
} from './../../../reducers/author_section/actions.js';

class AuthorDevotionalEdit extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleDevotionalSubmit = this._handleDevotionalSubmit.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchDevotionalByIdAction(this.props.params.devotionalId));
    this.props.dispatch(authorEditDevotional(this.props.params.devotionalId));
  }

  componentWillUnmount() {
    this.props.dispatch(authorResetEditDevotional());
  }

  _handleDevotionalSubmit(devotional) {
    this.props.dispatch(putDevotionalAction(devotional, '/author'));
  }

  render() {
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
            isSaving={this.props.devotional.status === SUBMITTING_STATUS} />}
      </section>
    );
  }
}

function mapStateToProps(state) {
  const dev = state.devotional_list.getIn(['devotional', state.author_section.get('editing_devotional')]);

  return {
    user: state.user,
    devotional: dev ? dev.toJS() : undefined
  };
}

export default AuthorDevotionalEdit;
export const AuthorDevotionalEditContainer = connect(mapStateToProps)(AuthorDevotionalEdit);
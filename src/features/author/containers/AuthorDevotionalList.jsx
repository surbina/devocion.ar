import React from 'react';
import { connect } from 'react-redux';
import {
  Map,
  List
} from 'immutable';
import { ThreeBounce } from 'better-react-spinkit';

import {
  fetchAuthorDevotionalPageAction,
  deleteDevotionalAction
} from '../../../reducers/devotional_list/actions.js';
import { REDUCER_FETCHING_PAGE_STATUS } from '../../../reducers/devotional_list/reducer.js';

import AuthorDevotionalItem from '../components/AuthorDevotionalItem.jsx';

class AuthorDevotionalList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.getDevotionals = this._getDevotionals.bind(this);
    this.handleDevotionalDelete = this._handleDevotionalDelete.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchAuthorDevotionalPageAction(this.props.authorId));
  }

  _getDevotionals() {
    return this.props.devotionals || Map();
  }

  devotionalComparator(devA, devB) {
    return -1 * devA.get('publish_date').localeCompare(devB.get('publish_date'));
  }

  _handleDevotionalDelete(devotional) {
    console.log(devotional);
  }

  render() {
    return(
      this.props.isLoadingDevotional && !this.props.lastDevotionalPageDate ?
        <div className="row">
          <div className="col-xs-12 text-center">
            <h4>Cargando devocionales <ThreeBounce /></h4>
          </div>
        </div> :
        <div className="row">
          <div className="col-xs-12">
            {this.getDevotionals().toArray().sort(this.devotionalComparator).map(devotional =>
              <AuthorDevotionalItem
                key={devotional.get('id')}
                devotional={devotional}
                onDevotionalDelete={this.handleDevotionalDelete} />
            )}
          </div>
          <div className="col-xs-12 col-md-offset-4 col-md-4 text-center">
            {this.props.isLoadingDevotional ?
              <ThreeBounce /> :
              <button className="btn btn-default btn-block" onClick={this.handleLoadMoreDevotional}>Cargar más</button>}
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  const authorId = state.user.get('user_id');

  return {
    isLoadingDevotional: state.devotional_list.get('status') === REDUCER_FETCHING_PAGE_STATUS,
    devotionals: state.devotional_list
      .get('devotional')
      .filter(devotional => devotional.get('author_id') === authorId)
      .toList(),
    authorId: authorId
  };
}

export default AuthorDevotionalList;
export const AuthorDevotionalListContainer = connect(mapStateToProps)(AuthorDevotionalList);
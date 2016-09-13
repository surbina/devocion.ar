import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Map } from 'immutable';

import { postCommentAction } from '../../../reducers/comment_list/actions.js';
import { SUBMITTING_STATUS } from '../../../reducers/comment_list/reducer.js';
import { SIGNED_USER_STATUS } from '../../../reducers/user/reducer.js';

import CommentForm from '../components/CommentForm.jsx';
import { CommentListContainer } from './CommentList.jsx';

export const DevotionalComment = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    devotional: React.PropTypes.instanceOf(Map),
    user: React.PropTypes.instanceOf(Map).isRequired,
    isSubmitting: React.PropTypes.bool.isRequired
  },
  handleCommentSubmit: function (comment) {
    this.props.dispatch(postCommentAction(this.props.devotional.get('id'), comment));    
  },
  render: function() {
    return(
      this.props.devotional === undefined ?
        false :
        <aside>
          {this.props.user.get('status') === SIGNED_USER_STATUS ?
            <CommentForm
              devotionalId={this.props.devotional.get('id')}
              user={this.props.user}
              onCommentSubmit={this.handleCommentSubmit}
              isSubmitting={this.props.isSubmitting}
            /> :
            <p className="text-center">
              <Link to="/sign/up">Registrate</Link> o <Link to="/sign/in">ingresá</Link> para poder comentar.
            </p>}
          <CommentListContainer />
        </aside>
    );
  }
});

function mapStateToProps(state) {
  return {
    user: state.user,
    isSubmitting: state.comment_list.get('status') === SUBMITTING_STATUS
  };
}

export const DevotionalCommentContainer = connect(mapStateToProps)(DevotionalComment);
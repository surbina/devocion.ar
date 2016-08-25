import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { postCommentAction } from '../../../reducers/comments/actions.js';
import { SIGNED_USER_STATUS } from '../../../reducers/user/reducer.js';

import CommentForm from '../components/CommentForm.jsx';
import { CommentListContainer } from './CommentList.jsx';

export const DevotionalComment = React.createClass({
  mixins: [PureRenderMixin],
  handleCommentSubmit: function (comment) {
    this.props.dispatch(postCommentAction(this.props.devotional.get('id'), comment));    
  },
  render: function() {
    return(
      this.props.devotional === undefined ?
        false :
        <section>
          {this.props.user.get('status') === SIGNED_USER_STATUS ?
            <CommentForm
              devotionalId={this.props.devotional.get('id')}
              user={this.props.user}
              onCommentSubmit={this.handleCommentSubmit}
            /> :
            <p className="text-center">
              <Link to="/sign/up">Registrate</Link> o <Link to="/sign/in">ingresá</Link> para poder comentar.
            </p>}
          <CommentListContainer />
        </section>
    );
  }
});

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export const DevotionalCommentContainer = connect(mapStateToProps)(DevotionalComment);
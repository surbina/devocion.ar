import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';

import { fetchCommentListAction } from '../reducers/comments/actions.js';

import Comment from '../components/Comment.jsx';

export const CommentList = React.createClass({
  mixins: [PureRenderMixin],
  componentDidMount: function () {
    this.props.dispatch(fetchCommentListAction(this.props.devotionalId));
  },
  getComments: function() {
    return this.props.comments || []
  },
  render: function() {
    return(
      <div>
        {this.props.comments === undefined ?
          <p>Cargando comentarios</p> :
          <div>
            {this.getComments().valueSeq().map(comment => 
              <Comment key={comment.get('id')} comment={comment} />
            )}
          </div>}
      </div>
    );
  }
});

function mapStateToProps(state) {
  const devotionalId = state.home_section.get('current_devotional_id');
  return {
    devotionalId: devotionalId,
    comments: state.comments.get(devotionalId)
  };
}

export const CommentListContainer = connect(mapStateToProps)(CommentList);
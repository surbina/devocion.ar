import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import { fetchCommentListAction } from '../../../reducers/comments/actions.js';

import Comment from '../components/Comment.jsx';

export const CommentList = React.createClass({
  mixins: [PureRenderMixin],
  getComments: function() {
    return this.props.comments || Map();
  },
  render: function() {
    return(
      this.props.comments === undefined ?
        <p className="text-center">Cargando comentarios</p> :
        <div>
          {this.getComments().size > 0 ?
            this.getComments().valueSeq().map(comment => 
              <Comment key={comment.get('id')} comment={comment} />
            ):
            <p className="text-center">Todavía no han comentado este devocional.</p>}
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
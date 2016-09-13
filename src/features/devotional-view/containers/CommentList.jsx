import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { ThreeBounce } from 'better-react-spinkit';

import { fetchCommentListAction } from '../../../reducers/comment_list/actions.js';

import Comment from '../components/Comment.jsx';

export const CommentList = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    devotionalId: React.PropTypes.string.isRequired,
    comments: React.PropTypes.instanceOf(Map)
  },
  componentDidMount: function() {
    this.props.dispatch(fetchCommentListAction(this.props.devotionalId));
  },
  componentWillReceiveProps: function(nextProps) {
    if(nextProps.devotionalId !== this.props.devotionalId) {
      this.props.dispatch(fetchCommentListAction(nextProps.devotionalId));
    }
  },
  getComments: function() {
    return this.props.comments || Map();
  },
  render: function() {
    return(
      this.props.comments === undefined ?
        <h5 className="text-center">Cargando comentarios <ThreeBounce /></h5> :
        <section>
          {this.getComments().size > 0 ?
            this.getComments().valueSeq().map(comment => 
              <Comment
                key={comment.get('id')}
                comment={comment} />
            ):
            <p className="text-center">Todavía no han comentado este devocional.</p>}
        </section>
    );
  }
});

function mapStateToProps(state) {
  const devotionalId = state.devotional_view_section.get('current_devotional_id');
  return {
    devotionalId: devotionalId,
    comments: state.comment_list.get(devotionalId)
  };
}

export const CommentListContainer = connect(mapStateToProps)(CommentList);
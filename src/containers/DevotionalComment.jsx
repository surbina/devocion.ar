import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

import { postCommentAction } from '../reducers/comments/actions.js';

import CommentForm from '../components/CommentForm.jsx';
import CommentList from '../components/CommentList.jsx';

export const DevotionalComment = React.createClass({
  mixins: [PureRenderMixin],

  handleCommentSubmit: function (comment) {
    this.props.dispatch(postCommentAction(this.props.devotional.get('id'), comment));    
  },
  render: function() {
    return(
      <div>
        {this.props.devotional === undefined ?
          <p>Loading comment</p> :
          <div>
            <CommentForm
              devotionalId={this.props.devotional.get('id')}
              user={this.props.user}
              onCommentSubmit={this.handleCommentSubmit}
            />
            <CommentList />
          </div>}
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export const DevotionalCommentContainer = connect(mapStateToProps)(DevotionalComment);
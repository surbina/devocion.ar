require('./CommentForm.scss');

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import moment from 'moment';

export default React.createClass({
  mixins: [PureRenderMixin],
  getInitialState: function() {
    return {comment_body: ''};
  },
  handleCommentBodyChange: function(e) {
    this.setState({comment_body: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    const comment_body = this.state.comment_body.trim();
    if(!comment_body) {
      return;
    }

    this.props.onCommentSubmit({
      user_id: this.props.user.get('user_id'),
      user_first_name: this.props.user.get('user_first_name'),
      user_last_name: this.props.user.get('user_last_name'),
      comment_body: comment_body,
      creation_date: moment().format()
    });

    this.setState({comment_body: ''});
  },
  render: function() {
    return(
      <form className="form-horizontal comment-form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <div className="col-sm-12">
            <textarea
              className="form-control vresize"
              id="content"
              rows="4"
              placeholder="Comentario ..."
              value={this.state.comment_body}
              onChange={this.handleCommentBodyChange}
            >
            </textarea>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-5 col-sm-2">
            <button type="submit" className="btn btn-default btn-block">Comentar</button>
          </div>
        </div>
      </form>
    );
  }
});
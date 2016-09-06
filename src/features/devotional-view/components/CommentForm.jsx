require('./CommentForm.scss');

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import moment from 'moment';
import { Map } from 'immutable';
import { ThreeBounce } from 'better-react-spinkit';
import classNames from 'classnames';

export default React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    devotionalId: React.PropTypes.string.isRequired,
    user: React.PropTypes.instanceOf(Map).isRequired,
    onCommentSubmit: React.PropTypes.func.isRequired,
    isSubmitting: React.PropTypes.bool.isRequired
  },
  getInitialState: function() {
    return {
      comment_body: '',
      comment_bodyValid: false,
      comment_bodyValidationMessage: ''
    };
  },
  handleCommentBodyChange: function(e) {
    this.setState({comment_body: e.target.value});
  },
  validateCommentBody: function() {
    const commentValue = this.state.comment_body.trim();
    const isValid = !!commentValue && commentValue.length <= 500;
    const validationMessage = !isValid ? 'Los comentarios tienen un maximo de 500 caracteres' : '';

    this.setState({
      comment_bodyValid: isValid,
      comment_bodyValidationMessage: validationMessage
    });

    return isValid;
  },
  handleSubmit: function(e) {
    e.preventDefault();
    const comment_body = this.state.comment_body.trim();
    if(!this.validateCommentBody()) {
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
    const commentBodyClasses = classNames({
      'form-group': true,
      'has-error': !!this.state.comment_bodyValidationMessage
    });

    return(
      <form className="form-horizontal comment-form" onSubmit={this.handleSubmit}>
        <div className={ commentBodyClasses }>
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
            {!!this.state.comment_bodyValidationMessage ?
              <span id="commentBodyHelpBlock" className="help-block">{this.state.comment_bodyValidationMessage}</span> :
              false}
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-5 col-sm-2 text-center">
            {this.props.isSubmitting ?
              <ThreeBounce /> :
              <button type="submit" className="btn btn-default btn-block">Comentar</button>}
          </div>
        </div>
      </form>
    );
  }
});
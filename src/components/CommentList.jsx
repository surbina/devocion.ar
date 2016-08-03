import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Comment from './Comment.jsx';

const comment = {
  user_first_name: 'Sebastian',
  creation_date: '27 de noviembre',
  comment_body: 'Cuerpo comentario'
};

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return(
      <div>
        <Comment comment={comment} />
        <Comment comment={comment} />
        <Comment comment={comment} />
      </div>
    );
  }
});
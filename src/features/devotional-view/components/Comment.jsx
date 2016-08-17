import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return(
      <div className="panel panel-default">
        <div className="panel-heading">
          {this.props.comment.get('user_first_name')} dijo el {this.props.comment.get('creation_date')}:
        </div>
        <div className="panel-body">
          {this.props.comment.get('comment_body')}
        </div>
      </div>
    );
  }
});
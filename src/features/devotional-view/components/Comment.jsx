import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Map } from 'immutable';
import moment from 'moment';

export default React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    comment: React.PropTypes.instanceOf(Map).isRequired
  },
  render: function() {
    return(
      <div className="panel panel-default">
        <div className="panel-heading">
          {this.props.comment.get('user_first_name')} dijo el {moment(this.props.comment.get('creation_date')).format('LL')}:
        </div>
        <div className="panel-body">
          {this.props.comment.get('comment_body')}
        </div>
      </div>
    );
  }
});
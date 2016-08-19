import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import moment from 'moment';

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return(
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="row">
            <div className="col-md-10">
              <div className="row">
                <div className="col-md-12">
                  <h3>{this.props.devotional.get('title')} - {this.props.devotional.get('passage')}</h3>
                </div>
                <div className="col-md-12">
                  <h4>{this.props.devotional.get('author_name')} - {moment(this.props.devotional.get('publish_date')).format('LL')}</h4>
                </div>
              </div>
            </div>
            <div className="col-md-2 text-right">
              Actions!
            </div>
          </div>
        </div>
      </div>
    );
  }
});
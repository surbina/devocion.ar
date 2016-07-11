import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return(
      <section>
        {this.props.devotional === undefined || this.props.devotional.get('fetching') ?
          <p>Loading data</p> :
          <div>
            <div className="row">
              <div className="col-md-12">
                <h3>{this.props.devotional.get('title')}</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <h4>{this.props.devotional.get('pasagge')}</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <p>{this.props.devotional.get('body')}</p>
              </div>
            </div>
          </div>}
      </section>
    );
  }
});
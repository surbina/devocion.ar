import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return(
      <section>
        <div className="row">
          <div className="col-md-12">
            <h3>{this.props.devotional.title}</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h4>{this.props.devotional.pasagge}</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <p>{this.props.devotional.body}</p>
          </div>
        </div>
      </section>
    );
  }
});
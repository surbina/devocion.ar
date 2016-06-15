import React from 'react';

export default React.createClass({
  getDevotional: function() {
    return this.props.devotional || {};
  },
  render: function() {
    return(
      <section>
        <div className="row">
          <div className="col-md-12">
            <h3>{this.getDevotional().title}</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h4>{this.getDevotional().pasagge}</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <p>{this.getDevotional().body}</p>
          </div>
        </div>
      </section>
    );
  }
});
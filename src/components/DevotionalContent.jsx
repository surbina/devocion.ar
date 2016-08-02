import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return(
      <section>
        {this.props.devotional === undefined || this.props.devotional.get('fetching') ?
          <p>Loading data</p> :
          <div className="row">
            <div className="col-md-12">
              <h3>{this.props.devotional.get('title')}</h3>
            </div>
            <div className="col-md-6">
              <h4>Pasaje: {this.props.devotional.get('passage')}</h4>
            </div>
            <div className="col-md-6">
              <h4>Fecha: {this.props.devotional.get('publish_date')}</h4>
            </div>
            <div className="col-md-12">
              <p>{this.props.devotional.get('body')}</p>
            </div>
            <div className="col-md-6">
              <button className="btn btn-default" onClick={this.props.onHandlePreviousDevotional}>Anterior</button>
            </div>
            <div className="col-md-6">
              <button className="btn btn-default" onClick={this.props.onHandleNextDevotional}>Siguiente</button>
            </div>
          </div>}
      </section>
    );
  }
});
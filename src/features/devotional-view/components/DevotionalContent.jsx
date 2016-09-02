require('./DevotionalContent.scss');

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import moment from 'moment';
import { ThreeBounce } from 'better-react-spinkit';

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return(
      this.props.devotional === undefined || this.props.devotional.get('fetching') ?
        <section className="devotional-view">
          <div className="row">
            <div className="col-md-12 text-center">
              <h4>Cargando devocional <ThreeBounce /></h4>
            </div>
          </div>
        </section> :
        <section className="devotional-view">
          <div className="row">
            <div className="col-md-2 col-xs-6 nav-button">
              <a href="javascript:void(0)" onClick={this.props.onHandlePreviousDevotional}>
                <span className="glyphicon glyphicon-menu-left" aria-hidden="true"></span>
                Anterior
              </a>
            </div>
            <div className="col-md-2 col-md-push-8 col-xs-6 text-right nav-button">
              <a href="javascript:void(0)" onClick={this.props.onHandleNextDevotional}>
                Siguiente
                <span className="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
              </a>
            </div>
            <div className="col-md-8 col-md-pull-2 col-xs-12 text-center">
              <h3>{this.props.devotional.get('title')}</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 text-center">
              <h5>{this.props.devotional.get('author_name')}</h5>
            </div>
            <div className="col-xs-12 text-center">
              <h4>{this.props.devotional.get('passage')} - {moment(this.props.devotional.get('publish_date')).format('LL')}</h4>
            </div>
            <div className="col-xs-12">
              <pre>{this.props.devotional.get('body')}</pre>
            </div>
          </div>
        </section>
    );
  }
});
require('./DevotionalContent.scss');

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Link } from 'react-router';
import moment from 'moment';
import { ThreeBounce } from 'better-react-spinkit';
import { Map } from 'immutable';

export default React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    devotional: React.PropTypes.instanceOf(Map)
  },
  render: function() {
    let prevDate, nextDate;
    if(!!this.props.devotional) {
      prevDate = moment(this.props.devotional.get('publish_date')).subtract(1, 'days').format('YYYY-MM-DD');
      nextDate = moment(this.props.devotional.get('publish_date')).add(1, 'days').format('YYYY-MM-DD');
    }

    return(
      this.props.devotional === undefined ?
        <section className="devotional-view">
          <div className="row">
            <div className="col-md-12 text-center">
              <h4>Cargando devocional <ThreeBounce /></h4>
            </div>
          </div>
        </section> :
        <section className="devotional-view">
          <nav className="row">
            <div className="col-md-2 col-xs-6 nav-button">
              <Link to={"/devotional/" + prevDate} >
                <span className="glyphicon glyphicon-menu-left" aria-hidden="true"></span>
                Anterior
              </Link>
            </div>
            <div className="col-md-2 col-md-push-8 col-xs-6 text-right nav-button">
              <Link to={"/devotional/" + nextDate}>
                Siguiente
                <span className="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
              </Link>
            </div>
            <div className="col-md-8 col-md-pull-2 col-xs-12 text-center">
              <h3>{this.props.devotional.get('title')}</h3>
            </div>
          </nav>
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
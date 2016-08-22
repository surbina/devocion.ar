require('./DevotionalItem.scss');

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import moment from 'moment';
import { Link } from 'react-router';

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return(
      <div className="panel panel-default devotional-item">
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
              <div className="dropdown action-menu">
                <button
                  className="btn btn-default dropdown-toggle"
                  type="button"
                  id={'actionMenu' + this.props.devotional.get('id')}
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="true">
                  Acciones
                  <span className="caret"></span>
                </button>
                <ul className="dropdown-menu" aria-labelledby={'actionMenu' + this.props.devotional.get('id')}>
                  <li><Link to={"/admin/devotional/edit/" + this.props.devotional.get('publish_date')}>Editar</Link></li>
                  <li><Link to="/admin">Eliminar</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
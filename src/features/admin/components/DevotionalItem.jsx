require('./DevotionalItem.scss');

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import moment from 'moment';
import { Link } from 'react-router';
import { toastr } from 'react-redux-toastr'

export default React.createClass({
  mixins: [PureRenderMixin],
  handleDelete: function() {
    const devotional = this.props.devotional.toJS();
    this.props.onDevotionalDelete(devotional);
  },
  openDeleteModal: function() {
    const toastrConfirmOptions = {
      onOk: this.handleDelete,
      okText: 'Eliminar',
      cancelText: 'Cancelar'
    };

    toastr.confirm('¿Estás seguro que quieres eliminar el devocional "' + this.props.devotional.get('title') + '"?', toastrConfirmOptions)
  },
  render: function() {
    return(
      <div className="panel panel-default devotional-item">
        <div className="panel-body">
          <div className="row">
            <div className="col-md-10 col-xs-8">
              <h3>{this.props.devotional.get('title')} - {this.props.devotional.get('passage')}</h3>
              <h4>{this.props.devotional.get('author_name')} - {moment(this.props.devotional.get('publish_date')).format('LL')}</h4>
            </div>
            <div className="col-md-2 col-xs-4 text-right">
              <div className="dropdown">
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
                <ul className="dropdown-menu dropdown-menu-right" aria-labelledby={'actionMenu' + this.props.devotional.get('id')}>
                  <li><Link to={"/admin/devotional/edit/" + this.props.devotional.get('publish_date')}>Editar</Link></li>
                  <li><a href="javascript:void(0)" onClick={this.openDeleteModal}>Eliminar</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
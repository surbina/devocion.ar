import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import moment from 'moment';
import { Link } from 'react-router';
import { toastr } from 'react-redux-toastr';
import { Map } from 'immutable';
import classNames from 'classnames';

import {
  DRAFT_DEVOTIONAL_STATUS,
  PUBLISHED_DEVOTIONAL_STATUS
} from '../../../reducers/devotional_list/reducer.js';

export default React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    devotional: React.PropTypes.instanceOf(Map),
    onDevotionalDelete: React.PropTypes.func.isRequired,
    onDevotionalPublish: React.PropTypes.func.isRequired,
    onDevotionalUnpublish: React.PropTypes.func.isRequired
  },
  handleDelete: function() {
    const devotional = this.props.devotional.toJS();
    this.props.onDevotionalDelete(devotional);
  },
  handlePublish: function() {
    const devotional = this.props.devotional.toJS();
    this.props.onDevotionalPublish(devotional);
  },
  handleUnpublish: function() {
    const devotional = this.props.devotional.toJS();
    this.props.onDevotionalUnpublish(devotional);
  },
  openDeleteModal: function() {
    const toastrConfirmOptions = {
      onOk: this.handleDelete,
      okText: 'Eliminar',
      cancelText: 'Cancelar'
    };

    toastr.confirm('¿Estás seguro que quieres eliminar el devocional "' + this.props.devotional.get('title') + '"?', toastrConfirmOptions)
  },
  openPublishModal: function() {
    const toastrConfirmOptions = {
      onOk: this.handlePublish,
      okText: 'Publicar',
      cancelText: 'Cancelar'
    };

    toastr.confirm('¿Estás seguro que quieres publicar el devocional "' + this.props.devotional.get('title') + '"?', toastrConfirmOptions)
  },
  openUnpublishModal: function() {
    const toastrConfirmOptions = {
      onOk: this.handleUnpublish,
      okText: 'Pasar a borrador',
      cancelText: 'Cancelar'
    };

    toastr.confirm('¿Estás seguro que quieres pasar el devocional "' + this.props.devotional.get('title') + '" a borrador?', toastrConfirmOptions)
  },
  render: function() {
    let statusLabel,
      statusClass;

    if(this.props.devotional.get('publish_status') === DRAFT_DEVOTIONAL_STATUS) {
      statusLabel = 'BORRADOR';

      statusClass = classNames({
        'text-warning': true
      });
    } else if(this.props.devotional.get('publish_status') === PUBLISHED_DEVOTIONAL_STATUS) {
      statusLabel = 'PUBLICADO';

      statusClass = classNames({
        'text-success': true
      });
    }

    return(
      <div className="panel panel-default devotional-item">
        <div className="panel-body">
          <div className="row">
            <div className="col-md-10 col-xs-8">
              <span className="title">{this.props.devotional.get('title')} - {this.props.devotional.get('passage')}</span>
              <span className="subtitle">
                {this.props.devotional.get('author_name')} - {this.props.devotional.get('publish_date') ? <span>{moment(this.props.devotional.get('publish_date')).format('LL')} - </span> : false}
                <span>Status: <span className={ statusClass }>{statusLabel}</span></span>
                {!this.props.devotional.get('publish_date') ? <span> - <span className="text-danger">FECHA DE PUBLICACIÓN SIN DEFINIR</span></span> : false}
              </span>
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
                  {this.props.devotional.get('publish_status') === DRAFT_DEVOTIONAL_STATUS && !!this.props.devotional.get('publish_date') ?
                    <li><a href="javascript:void(0)" onClick={this.openPublishModal}>Publicar</a></li> : false}
                  {this.props.devotional.get('publish_status') === PUBLISHED_DEVOTIONAL_STATUS ?
                    <li><a href="javascript:void(0)" onClick={this.openUnpublishModal}>Pasar a borrador</a></li> : false}
                  <li><Link to={"/admin/devotional/edit/" + this.props.devotional.get('id')}>Editar</Link></li>
                  {this.props.devotional.get('publish_status') === DRAFT_DEVOTIONAL_STATUS ?
                    <li><a href="javascript:void(0)" onClick={this.openDeleteModal}>Eliminar</a></li> : false}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
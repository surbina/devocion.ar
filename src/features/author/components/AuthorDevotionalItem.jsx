import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import classNames from 'classnames';

import {
  DRAFT_DEVOTIONAL_STATUS,
  PUBLISHED_DEVOTIONAL_STATUS
} from '../../../reducers/devotional_list/reducer.js';

class AuthorDevotionalItem extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
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
      <div className="panel panel-default author-devotional-item">
        <div className="panel-body">
          <div className="row">
            <div className="col-md-10 col-xs-8">
              <span className="title">{this.props.devotional.get('title')} - {this.props.devotional.get('passage')} </span>
              <span className="subtitle">
                {this.props.devotional.get('publish_date') ?
                  <span>{moment(this.props.devotional.get('publish_date')).format('LL')} - </span> :
                  false}
                <span>Status: <span className={ statusClass }>{statusLabel}</span></span>
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
                  <li><Link to={"/author/devotional/edit/" + this.props.devotional.get('id')}>Editar</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthorDevotionalItem;
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import moment from 'moment';

export default React.createClass({
  mixins: [PureRenderMixin],
  getDevotionals: function() {
    return this.props.devotionals || [];
  },
  render: function() {
    return(
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <td>Título</td>
            <td>Autor</td>
            <td>Fecha publicación</td>
            <td>Acciones</td>
          </tr>
        </thead>
        <tbody>
          {this.getDevotionals().valueSeq().map(devotional =>
            <tr key={devotional.get('id')}>
              <td>{devotional.get('title')}</td>
              <td>{devotional.get('author_name')}</td>
              <td>{moment(devotional.get('publish_date')).format('LL')}</td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
});
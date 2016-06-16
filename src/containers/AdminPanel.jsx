import React from 'react';
import DevotionalList from '../components/DevotionalList';
import { Link } from 'react-router';
import { fromJS } from 'immutable';

const devotionals = fromJS([{
  id: 1,
  title: 'Titutlo primera entrada',
  author: 'Pepe Sanchez',
  publishDate: '25 de mayo',
}, {
  id: 2,
  title: 'Titutlo segunda entrada',
  author: 'Juan Pedro',
  publishDate: '26 de mayo',
}, {
  id: 3,
  title: 'Titutlo tercera entrada',
  author: 'El Papanata',
  publishDate: '27 de mayo',
}]);

export default React.createClass({
  render: function() {
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link to="/admin/devotional/add" className="btn btn-default">Nuevo devocional</Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <DevotionalList devotionals={devotionals} />
          </div>
        </div>
      </div>
    );
  }
});
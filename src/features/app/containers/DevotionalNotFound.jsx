import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
  render: function() {
    return(
      <section>
        <div className="row">
          <div className="col-xs-12">
            <h3>¡Uuupsss!</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <p>No pudimos encontrar un devocional para la fecha que seleccionaste; prueba usar el <Link to="/calendar">Calendario</Link> para buscar el devocional de alguna otra fecha.</p>
          </div>
        </div>
      </section>
    );
  }
});
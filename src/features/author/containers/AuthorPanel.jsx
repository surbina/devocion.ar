import React from 'react';
import { Link } from 'react-router';

import { AuthorDevotionalListContainer } from './AuthorDevotionalList.jsx';

class AuthorPanel extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <section className="author-panel">
        <div className="row">
          <div className="col-md-12 text-center">
            <h3>Administrar devocionales</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-right">
            <Link to="/author/devotional/add" className="btn btn-default action-button">Nuevo devocional</Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <AuthorDevotionalListContainer />
          </div>
        </div>
      </section>
    );
  }
}

export default AuthorPanel;
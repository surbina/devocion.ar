import React from 'react';
import DevotionalContent from '../components/DevotionalContent';
import DevotionalComment from '../components/DevotionalComment';
import { fromJS } from 'immutable';

const devotional = fromJS({
  title: 'Titulo devocional',
  pasagge: 'Pasaje devocional',
  body: 'Cuerpo devocional muy laargooaoaoas alsjdalj aldjalskdjl'
});

export default React.createClass({
  render: function() {
    return(
      <main className="container">
        <DevotionalContent devotional={devotional} />
        <DevotionalComment />
      </main>
    );
  }
});
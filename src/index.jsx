import React from 'react';
import ReactDOM from 'react-dom';

import {createStore} from 'redux';
import {Provider} from 'react-redux';

import Routes from './Routes';
import reducer from './reducers/reducer.js';

const store = createStore(reducer);
store.dispatch({
  type: 'SET_STATE',
  state: {
    devotional_list: {
      1: {
        id: 1,
        title: 'Titutlo primera entrada 1',
        pasagge: 'Pasaje devocional',
        body: 'Cuerpo devocional muy laargooaoaoas alsjdalj aldjalskdjl',
        author: 'Pepe Sanchez',
        publishDate: '25 de mayo',
      },
      2: {
        id: 2,
        title: 'Titutlo segunda entrada 2',
        pasagge: 'Pasaje devocional',
        body: 'Cuerpo devocional muy laargooaoaoas alsjdalj aldjalskdjl',
        author: 'Juan Pedro',
        publishDate: '26 de mayo',
      },
      3: {
        id: 3,
        title: 'Titutlo tercera entrada 3',
        pasagge: 'Pasaje devocional',
        body: 'Cuerpo devocional muy laargooaoaoas alsjdalj aldjalskdjl',
        author: 'El Papanata',
        publishDate: '27 de mayo',
      }
    },
    home_section: {
      current_devotional: '2'
    }
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
);
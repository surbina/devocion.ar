import React from 'react';
import { Provider } from 'react-redux';
import Routes from './Routes.jsx';

export default React.createClass({
  render: function() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
});
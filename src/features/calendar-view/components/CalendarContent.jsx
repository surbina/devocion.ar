import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import CalendarContent from '../components/CalendarContent.jsx';

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return(
      <CalendarContent />
    );
  }
});
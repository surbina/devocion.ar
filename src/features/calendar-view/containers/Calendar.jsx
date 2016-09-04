import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { hashHistory  } from 'react-router';

import CalendarContent from '../components/CalendarContent.jsx';

export const Calendar = React.createClass({
  mixins: [PureRenderMixin],
  handleSelectedDate: function(date) {
    hashHistory.push('/devotional/' + date.format('YYYY-MM-DD'));
  },
  render: function() {
    return(
      <div className="row">
        <div className="col-xs-12 text-center">
          <h3>Calendario</h3>
        </div>
        <div className="col-xs-12">
          <CalendarContent onSelect={this.handleSelectedDate} />
        </div>
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {};
}

export const CalendarContainer = connect(mapStateToProps)(Calendar);
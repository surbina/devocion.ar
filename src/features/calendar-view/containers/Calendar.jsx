import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import InfiniteCalendar from 'react-infinite-calendar';

export const Calendar = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    // Render the Calendar
    const today = new Date();
    const minDate = Number(new Date()) - (24*60*60*1000) * 7; // One week before today

    return(
      <InfiniteCalendar
        width={400}
        height={600}
        selectedDate={today}
        disabledDays={[0,6]}
        minDate={minDate}
        keyboardSupport={true}
      />
    );
  }
});

function mapStateToProps(state) {
  return {};
}

export const CalendarContainer = connect(mapStateToProps)(Calendar);
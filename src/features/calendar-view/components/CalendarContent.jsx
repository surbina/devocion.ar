import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import InfiniteCalendar from 'react-infinite-calendar';
import moment from 'moment';

export default React.createClass({
  mixins: [PureRenderMixin],
  locale: {
    name: 'es',
    headerFormat: 'dddd, Do MMM',
    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    weekdays: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    weekdaysShort: ['dom.', 'lun.', 'mar.', 'mié.', 'jue.', 'vie.', 'sáb.'],
    blank: 'Seleccione una fecha ...',
    todayLabel: {
     long: 'Hoy',
     short: 'Hoy'
    }
  },
  render: function() {
    return(
      <InfiniteCalendar
        width={'100%'}
        height={window.innerHeight - 175}
        rowHeight={100}
        selectedDate={moment()}
        keyboardSupport={true}
        showHeader={false}
        locale={this.locale}
        onSelect={this.props.onSelect}
      />
    );
  }
});
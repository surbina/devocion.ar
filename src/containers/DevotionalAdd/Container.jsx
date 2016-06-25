import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import DevotionalForm from '../../components/DevotionalForm';

export const DevotionalAdd = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return(
      <div className="container">
        <DevotionalForm />
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {};
}    

export const DevotionalAddContainer = connect(mapStateToProps)(DevotionalAdd);
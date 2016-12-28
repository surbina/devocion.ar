import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';

import { DevotionalListContainer } from './DevotionalList.jsx';

export const DevotionalPanel = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return(
      <section className="admin-panel">
        <div className="row">
          <div className="col-md-12 text-center">
            <h3>Administrar devocionales</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <DevotionalListContainer />
          </div>
        </div>
      </section>
    );
  }
});

function mapStateToProps(state) {
  return {};
}

export const DevotionalPanelContainer = connect(mapStateToProps)(DevotionalPanel);
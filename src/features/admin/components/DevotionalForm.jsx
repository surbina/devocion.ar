require('./DevotionalForm.scss');

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Datetime  from 'react-datetime';
import moment from 'moment';
import { Map } from 'immutable';
import { ThreeBounce } from 'better-react-spinkit';

export default React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    model: React.PropTypes.object.isRequired,
    user: React.PropTypes.instanceOf(Map).isRequired,
    onDevotionalSubmit: React.PropTypes.func.isRequired,
    isSaving: React.PropTypes.bool.isRequired
  },
  getInitialState: function() {
    return {
      title: this.props.model.title,
      passage: this.props.model.passage,
      body: this.props.model.body,
      publish_date: this.props.model.publish_date ? moment(this.props.model.publish_date) : ''
    };
  },
  handleTitleChange: function(e) {
    this.setState({title: e.target.value});
  },
  handlePassageChange: function(e) {
    this.setState({passage: e.target.value});
  },
  handleBodyChange: function(e) {
    this.setState({body: e.target.value});
  },
  handlePublishDateChange: function(e) {
    this.setState({publish_date: e});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    const title = this.state.title.trim();
    const passage = this.state.passage.trim();
    const publish_date = this.state.publish_date;
    const body = this.state.body.trim();
    if (!title || !passage || !publish_date || !body) {
      return;
    }

    this.props.onDevotionalSubmit({
      id: this.props.model.id,
      title: title,
      passage: passage,
      publish_date: publish_date.format('YYYY-MM-DD'),
      body: body,
      author_name: this.props.model.author_name ?
        this.props.model.author_name :
        this.props.user.get('user_first_name') + ' ' + this.props.user.get('user_last_name'),
      author_id: this.props.model.author_id ?
        this.props.model.author_id :
        this.props.user.get('user_id'),
      creation_date: this.props.creation_date ?
        this.props.creation_date :
        moment().toISOString()
    });
  },
  render: function() {
    return(
      <form className="form-horizontal devotional-form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <div className="col-md-5 col-xs-12 multiple-row">
            <input
              type="text"
              placeholder="Título"
              className="form-control"
              id="inputTitle"
              value={this.state.title}
              onChange={this.handleTitleChange}
            />
          </div>

          <div className="col-md-5 col-xs-12 multiple-row">
            <input
              type="text"
              placeholder="Pasaje"
              className="form-control"
              id="inputPassage"
              value={this.state.passage}
              onChange={this.handlePassageChange}
            />
          </div>

          <div className="col-md-2 col-xs-12 multiple-row">
            <Datetime
              value={this.state.publish_date}
              onChange={this.handlePublishDateChange}
              dateFormat="DD/MM/YYYY"
              timeFormat={false}
              closeOnSelect={true}
              inputProps={{placeholder: 'Fecha de publicación'}}/>
          </div>
        </div>

        <div className="form-group">
          <div className="col-md-12 col-xs-12">
            <textarea
              id="textBody"
              placeholder="Contenido ..."
              className="form-control"
              rows="10"
              value={this.state.body}
              onChange={this.handleBodyChange}
            >
            </textarea>
          </div>
        </div>
        <div className="form-group">
          <div className="col-md-offset-5 col-md-2 col-xs-12 text-center">
            {this.props.isSaving ?
              <ThreeBounce /> :
              <button type="submit" className="btn btn-default btn-block">Guardar</button>}
          </div>
        </div>
      </form>
    );
  }
});
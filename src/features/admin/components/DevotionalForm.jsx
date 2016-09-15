import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Datetime  from 'react-datetime';
import moment from 'moment';
import { Map } from 'immutable';
import { ThreeBounce } from 'better-react-spinkit';
import classNames from 'classnames';

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
      titleValid: false,
      titleValidationMessage: '',
      passage: this.props.model.passage,
      passageValid: false,
      passageValidationMessage: '',
      body: this.props.model.body,
      bodyValid: false,
      bodyValidationMessage: '',
      publish_date: this.props.model.publish_date ? moment(this.props.model.publish_date) : '',
      publish_dateValid: false,
      publish_dateValidationMessage: ''
    };
  },
  handleTitleChange: function(e) {
    this.setState({title: e.target.value});
  },
  validateTitle: function() {
    const titleValue = this.state.title.trim();
    const isValid = !!titleValue && titleValue.length < 50;
    const validationMessage = !isValid ? 'Por favor completa el título, la longitud del mismo debe ser menor a 50 caracteres' : '';

    this.setState({
      titleValid: isValid,
      titleValidationMessage: validationMessage
    });

    return isValid;
  },
  handlePassageChange: function(e) {
    this.setState({passage: e.target.value});
  },
  validatePassage: function() {
    const passageValue = this.state.passage.trim();
    const isValid = !!passageValue && passageValue.length < 20;
    const validationMessage = !isValid ? 'Por favor completa el pasaje, la longitud del mismo debe ser menor a 20 caracteres' : '';

    this.setState({
      passageValid: isValid,
      passageValidationMessage: validationMessage
    });

    return isValid;
  },
  handleBodyChange: function(e) {
    this.setState({body: e.target.value});
  },
  validateBody: function() {
    const bodyValue = this.state.body.trim();
    const isValid = !!bodyValue && bodyValue.length < 4000;
    const validationMessage = !isValid ? 'Por favor completa el contenido del devocional, la longitud del mismo debe ser menor a 1500 caracteres' : '';

    this.setState({
      bodyValid: isValid,
      bodyValidationMessage: validationMessage
    });

    return isValid;
  },
  handlePublishDateChange: function(e) {
    this.setState({publish_date: e}, this.validatePublishDate);
  },
  validatePublishDate: function() {
    const publishDateValue = this.state.publish_date;
    const isValid = !!publishDateValue;
    const validationMessage = !isValid ? 'Por favor completa la fecha del devocional' : '';

    this.setState({
      publish_dateValid: isValid,
      publish_dateValidationMessage: validationMessage
    });

    return isValid;
  },
  handleSubmit: function(e) {
    e.preventDefault();
    const title = this.state.title.trim();
    const passage = this.state.passage.trim();
    const publish_date = this.state.publish_date;
    const body = this.state.body.trim();
    if (!this.validateTitle() |
        !this.validatePassage() |
        !this.validatePublishDate() |
        !this.validateBody()) {
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
    const titleClass = classNames({
      'col-md-5': true,
      'col-xs-12': true,
      'multiple-row': true,
      'has-error': !!this.state.titleValidationMessage
    });

    const passageClass = classNames({
      'col-md-5': true,
      'col-xs-12': true,
      'multiple-row': true,
      'has-error': !!this.state.passageValidationMessage
    });

    const publishDateClass = classNames({
      'col-md-2': true,
      'col-xs-12': true,
      'multiple-row': true,
      'has-error': !!this.state.publish_dateValidationMessage
    });

    const bodyClass = classNames({
      'col-md-12': true,
      'col-xs-12': true,
      'has-error': !!this.state.bodyValidationMessage
    });

    return(
      <form className="form-horizontal devotional-form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <div className={ titleClass }>
            <input
              type="text"
              placeholder="Título"
              className="form-control"
              id="inputTitle"
              value={this.state.title}
              onChange={this.handleTitleChange}
              onBlur={this.validateTitle}
            />
            {!!this.state.titleValidationMessage ?
              <span id="titleHelpBlock" className="help-block">{this.state.titleValidationMessage}</span> :
              false}
          </div>

          <div className={ passageClass }>
            <input
              type="text"
              placeholder="Pasaje"
              className="form-control"
              id="inputPassage"
              value={this.state.passage}
              onChange={this.handlePassageChange}
              onBlur={this.validatePassage}
            />
            {!!this.state.passageValidationMessage ?
              <span id="passageHelpBlock" className="help-block">{this.state.passageValidationMessage}</span> :
              false}
          </div>

          <div className={ publishDateClass }>
            <Datetime
              value={this.state.publish_date}
              onChange={this.handlePublishDateChange}
              dateFormat="DD/MM/YYYY"
              timeFormat={false}
              closeOnSelect={true}
              inputProps={{placeholder: 'Fecha de publicación'}}
              onBlur={this.validatePublishDate}
            />
            {!!this.state.publish_dateValidationMessage ?
              <span id="publishDateHelpBlock" className="help-block">{this.state.publish_dateValidationMessage}</span> :
              false}
          </div>
        </div>

        <div className="form-group">
          <div className={ bodyClass }>
            <textarea
              id="textBody"
              placeholder="Contenido ..."
              className="form-control"
              rows="10"
              value={this.state.body}
              onChange={this.handleBodyChange}
              onBlur={this.validateBody}
            >
            </textarea>
            {!!this.state.bodyValidationMessage ?
              <span id="bodyDateHelpBlock" className="help-block">{this.state.bodyValidationMessage}</span> :
              false}
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
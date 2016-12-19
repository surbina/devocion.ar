import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Datetime  from 'react-datetime';
import moment from 'moment';
import { Map } from 'immutable';
import { ThreeBounce } from 'better-react-spinkit';
import classNames from 'classnames';

import TextEditor from '../text-editor/TextEditor.jsx';

export default React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    model: React.PropTypes.object.isRequired,
    user: React.PropTypes.instanceOf(Map).isRequired,
    onDevotionalSubmit: React.PropTypes.func.isRequired,
    isSaving: React.PropTypes.bool.isRequired,
    showPublishDate: React.PropTypes.bool,
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
      bodyLength: this.props.model.body.length,
      bodyWordCount: this.props.model.body,
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
  handleBodyChange: function(editorValue) {
    const editorState = editorValue.getEditorState();
    const contenState = editorState.getCurrentContent();
    this.setState({
      body: editorValue.toString('html'),
      bodyLength: contenState.getPlainText().length,
      bodyWordCount: this._countWords(contenState.getPlainText())
    });
  },
  validateBody: function() {
    const bodyValue = this.state.body.trim();
    const bodyLength = this.state.bodyLength;
    const wordCount = this.state.bodyWordCount;
    const isValid = 0 < bodyLength && bodyLength <= 4000 && wordCount <= 250;
    const validationMessage = !isValid ? 'Por favor completa el contenido del devocional, el mismo debe tener un largo de 250 palabras y 4000 caracteres como máximo.' : '';

    this.setState({
      bodyValid: isValid,
      bodyValidationMessage: validationMessage
    });

    return isValid;
  },
  _countWords: function(s){
    s = s.replace(/(^\s*)|(\s*$)/gi, '');
    s = s.replace(/[ ]{2,}/gi, ' ');
    s = s.replace(/\n /, '\n');
    s = s.replace(/\n/, ' ');
    s = s.replace(/\t /, ' ');
    s = s.replace(/\t/, ' ');

    return s.split(' ').length;
  },
  handlePublishDateChange: function(e) {
    this.setState({publish_date: e}, this.validatePublishDate);
  },
  validatePublishDate: function() {
    const publishDateValue = this.state.publish_date;
    const isValid = !this.props.showPublishDate || !!publishDateValue;
    const validationMessage = !isValid ? 'Por favor completa la fecha del devocional' : '';

    this.setState({
      publish_dateValid: isValid,
      publish_dateValidationMessage: validationMessage
    });

    return isValid;
  },
  handleSubmit: function(e) {
    e.preventDefault();
    if (!this.validateTitle() |
        !this.validatePassage() |
        !this.validatePublishDate() |
        !this.validateBody()) {
      return;
    }

    const title = this.state.title.trim();
    const passage = this.state.passage.trim();
    const publish_date = this.props.showPublishDate ? this.state.publish_date.format('YYYY-MM-DD') : this.state.publish_date;
    const body = this.state.body.trim();

    this.props.onDevotionalSubmit({
      id: this.props.model.id,
      title: title,
      passage: passage,
      publish_date: publish_date,
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
      'col-md-5': this.props.showPublishDate,
      'col-md-6': !this.props.showPublishDate,
      'col-xs-12': true,
      'multiple-row': true,
      'has-error': !!this.state.titleValidationMessage
    });

    const passageClass = classNames({
      'col-md-5': this.props.showPublishDate,
      'col-md-6': !this.props.showPublishDate,
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

          {this.props.showPublishDate ?
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
            </div> :
            false}
        </div>

        <div className="form-group">
          <div className={ bodyClass }>
            <TextEditor
              placeholder="Contenido ..."
              value={this.state.body}
              onChange={this.handleBodyChange}
              onBlur={this.validateBody}
              showError={!!this.state.bodyValidationMessage} />
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
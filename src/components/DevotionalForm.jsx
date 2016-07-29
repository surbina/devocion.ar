import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import DatePicker from 'react-bootstrap-date-picker';
import moment from 'moment';

export default React.createClass({
  mixins: [PureRenderMixin],
  getInitialState: function() {
    return {title: '', passage: '', body: '', publish_date: ''};
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
      title: title,
      passage: passage,
      publish_date: publish_date,
      body: body,
      author_name: this.props.user.get('user_first_name') + ' ' + this.props.user.get('user_last_name'),
      author_id: this.props.user.get('user_id'),
      creation_date: moment().toISOString()
    });
    this.setState({title: '', passage: '', body: '', publish_date: ''});
  },
  render: function() {
    return(
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label for="inputTitle" className="col-sm-1 control-label">Título</label>
          <div className="col-sm-5">
            <input
              type="text"
              placeholder="Título"
              className="form-control"
              id="inputTitle"
              value={this.state.title}
              onChange={this.handleTitleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label for="inputPassage" className="col-sm-1 control-label">Pasaje</label>
          <div className="col-sm-5">
            <input
              type="text"
              placeholder="Pasaje"
              className="form-control"
              id="inputPassage"
              value={this.state.passage}
              onChange={this.handlePassageChange}
            />
          </div>

          <label for="inputPassage" className="col-sm-2 control-label">Fecha de publicación</label>
          <div className="col-sm-4">
            <DatePicker value={this.state.publish_date} onChange={this.handlePublishDateChange}/>
          </div>
        </div>

        <div className="form-group">
          <label for="textBody" className="col-sm-1 control-label">Contenido</label>
          <div className="col-sm-11">
            <textarea
              className="form-control"
              id="textBody"
              rows="10"
              value={this.state.body}
              onChange={this.handleBodyChange}
            >
            </textarea>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-default pull-right">Guardar</button>
          </div>
        </div>
      </form>
    );
  }
});
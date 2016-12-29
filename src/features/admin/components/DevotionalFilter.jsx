import React from 'react';

import {
  DRAFT_DEVOTIONAL_STATUS,
  PUBLISHED_DEVOTIONAL_STATUS
} from '../../../reducers/devotional_list/reducer.js';

class DevotionalFilter extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      devotionalName: '',
      authorName: '',
      publishedStatus: 'ALL'
    };

    this.handleDevotionalNameChange = this._handleDevotionalNameChange.bind(this);
    this.handleAuthorNameChange = this._handleAuthorNameChange.bind(this);
    this.handlePublishedStatusChange = this._handlePublishedStatusChange.bind(this);
    this.handleSubmit = this._handleSubmit.bind(this);
  }

  _handleDevotionalNameChange(e) {
    this.setState({devotionalName: e.target.value});
  }

  _handleAuthorNameChange(e) {
    this.setState({authorName: e.target.value});
  }

  _handlePublishedStatusChange(e) {
    this.setState({publishedStatus: e.target.value});
  }

  _handleSubmit(e) {
    e.preventDefault();

    const devotionalName = this.state.devotionalName.trim();
    const authorName = this.state.authorName.trim();
    const publishedStatus = this.state.publishedStatus.trim();
    

    this.props.onFilter({
      devotionalName,
      authorName,
      publishedStatus
    });
  }

  render() {
    return(
      <form className="form-inline text-center devotional-filter" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input
            id="devotionalNameInput"
            type="text"
            className="form-control"
            placeholder="Nombre del devocional"
            onChange={this.handleDevotionalNameChange} />
        </div>
        <div className="form-group">
          <input
            id="authorNameInput"
            type="text"
            className="form-control"
            placeholder="Nombre del autor"
            onChange={this.handleAuthorNameChange} />
        </div>
        <select
          className="form-control"
          value={this.state.publishedStatus}
          onChange={this.handlePublishedStatusChange}>
          <option value="ALL">Todos</option>
          <option value={PUBLISHED_DEVOTIONAL_STATUS}>Publicado</option>
          <option value={DRAFT_DEVOTIONAL_STATUS}>Borrador</option>
        </select>
        <button type="submit" className="btn btn-default">Filtrar</button>
      </form>
    );
  }
}

export default DevotionalFilter;
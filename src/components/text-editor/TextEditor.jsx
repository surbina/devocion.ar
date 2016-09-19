import React from 'react';

import {
  Editor,
  EditorState,
  RichUtils
} from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
import classNames from 'classnames';
import Toolbar from './Toolbar.jsx';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: props.value ? EditorState.createWithContent(stateFromHTML(props.value)) : EditorState.createEmpty()
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = this._handleEditorStateChange.bind(this);
    this.onBlur = this._onBlur.bind(this);
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.logState = () => console.log(this.state.editorState.toJS());
  }

  _onBlur(e) {
    if(this.props.onBlur) {
      this.props.onBlur(e);
    }
  }

  _handleEditorStateChange(editorState) {
    this.setState({editorState});
    this.props.onChange(editorState);
  }

  _handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  render() {
    const {editorState} = this.state;
    const editorClasses = classNames({
      'text-editor__editor': true,
      'text-editor__editor--has-focus': editorState.getSelection().getHasFocus(),
      'text-editor__editor--has-error': this.props.showError
    });

    return(
      <div className="text-editor">
        <Toolbar
          editorState={editorState}
          onChange={this.onChange}
          setFocus={this.focus} />
        <div className={editorClasses} onClick={this.focus}>
          <Editor
            editorState={editorState}
            onChange={this.onChange}
            onBlur={this.onBlur}
            placeholder={this.props.placeholder}
            ref="editor" />
        </div>
      </div>
    );
  }
}

export default TextEditor;
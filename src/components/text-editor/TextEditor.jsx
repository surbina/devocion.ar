import React, {Component, PropTypes} from 'react';
import RichTextEditor from 'react-rte';
import classNames from 'classnames';

class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value ? RichTextEditor.createValueFromString(props.value, 'html') : RichTextEditor.createEmptyValue()
    };

    this.focus = this._focus.bind(this);
    this.onChange = this._onChange.bind(this);
    this.onBlur = this._onBlur.bind(this);
  }

  _onChange(value) {
    this.setState({value});

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  _onBlur(e) {
    if(this.props.onBlur) {
      this.props.onBlur(e);
    }
  }

  _focus() {
    this.refs.editor._focus();
  }

  render () {
    const {value} = this.state;
    const rteClassName = classNames({
      'text-editor': true,
      'text-editor--has-focus': value.getEditorState().getSelection().getHasFocus(),
      'text-editor--has-error': this.props.showError
    });
    const editorClasses = classNames({
      'text-editor__editor': true,
    });

    return (
      <div onClick={this.focus}>
        <RichTextEditor
          ref="editor"
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={this.onChange}
          onBlur={this.onBlur}
          className={rteClassName}
          editorClassName={editorClasses}
        />
      </div>
    );
  }
}

export default TextEditor;
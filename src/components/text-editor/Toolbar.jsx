import React from 'react';
import { RichUtils } from 'draft-js';
import classNames from 'classnames';
import StyleButton from './StyleButton.jsx'

const INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
];

const BLOCK_TYPES = [
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'Blockquote', style: 'blockquote'}
];

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
  }

  onInlineStyleToggle(style) {
    this.props.onChange(
      RichUtils.toggleInlineStyle(this.props.editorState, style)
    );
    this.props.setFocus();
  }

  onBlockTypeToggle(blockType) {
    this.props.onChange(
      RichUtils.toggleBlockType(this.props.editorState, blockType)
    );
  }

  render() {
    let that = this;
    const editorState = this.props.editorState;
    const currentInlineStyle = editorState.getCurrentInlineStyle();
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return(
      <div className="btn-toolbar text-editor__toolbar" role="toolbar">
        <div className="btn-group" role="group">
          {INLINE_STYLES.map(type =>
            <StyleButton
              key={type.label}
              isActive={currentInlineStyle.has(type.style)}
              onToggle={this.onInlineStyleToggle.bind(that, type.style)}
            >
              {type.label}
            </StyleButton>
          )}

          {BLOCK_TYPES.map(type =>
            <StyleButton
              key={type.label}
              isActive={type.style === blockType}
              onToggle={this.onBlockTypeToggle.bind(that, type.style)}
            >
              {type.label}
            </StyleButton>
          )}
        </div>
      </div>
    );
  }
}

export default Toolbar;
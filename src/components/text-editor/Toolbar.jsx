import React from 'react';
import { RichUtils } from 'draft-js';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';
import StyleButton from './StyleButton.jsx';

const INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD', icon: 'bold'},
  {label: 'Italic', style: 'ITALIC', icon: 'italic'},
  {label: 'Underline', style: 'UNDERLINE', icon: 'underline'}
];

const BLOCK_TYPES = [
  {label: 'OL', style: 'ordered-list-item', icon: 'list-ol'},
  {label: 'UL', style: 'unordered-list-item', icon: 'list-ul'},
  {label: 'Citar', style: 'blockquote', icon: 'quote-right'}
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
              <FontAwesome name={type.icon} />
            </StyleButton>
          )}

          {BLOCK_TYPES.map(type =>
            <StyleButton
              key={type.label}
              isActive={type.style === blockType}
              onToggle={this.onBlockTypeToggle.bind(that, type.style)}
            >
              <FontAwesome name={type.icon} />
            </StyleButton>
          )}
        </div>
      </div>
    );
  }
}

export default Toolbar;
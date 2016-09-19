import React from 'react';
import classNames from 'classnames';

class StyleButton extends React.Component {
  constructor(props) {
    super(props);

    this.onMouseDown = this._onMouseDownPreventDefault.bind(this);
  }

  _onMouseDownPreventDefault(event: Event) {
    event.preventDefault();
    let {onMouseDown} = this.props;
    if (onMouseDown != null) {
      onMouseDown(event);
    }
  }

  render() {
    const classes = classNames({
      'btn': true,
      'btn-default': true,
      'active': this.props.isActive
    });

    return(
      <button
        type="button"
        className={classes}
        onClick={this.props.onToggle}
        onMouseDown={this.onMouseDown} >
        {this.props.children}
      </button>
    );
  }
}

export default StyleButton;
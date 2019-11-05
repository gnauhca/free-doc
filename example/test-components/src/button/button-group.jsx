import React from 'react';
import PropTypes from 'prop-types';

/**
 * @visibleName ButtonGroup 按钮组
 */
export default class ButtonGroup extends React.Component {

  static propTypes = {
    type: PropTypes.oneOf(['primary', 'default']),
    size: PropTypes.oneOf(['large', 'default', 'small']),
    block: PropTypes.bool,
    disabled: PropTypes.bool
  };

  static childContextTypes = {
    type: PropTypes.oneOf(['primary', 'default']),
    size: PropTypes.oneOf(['large', 'default', 'small']),
    block: PropTypes.bool,
    disabled: PropTypes.bool
  }

  getChildContext() {
    return {
      type: this.props.type,
      size: this.props.size,
      block: this.props.block || false,
      disabled: this.props.disabled || false
    };
  }

  render() {
    const { children, ...others } = this.props;

    delete others.type;
    delete others.size;
    delete others.block;
    delete others.disabled;

    return (
      <div className="ten-button-group" {...others}>{children}</div>
    );
  }
}

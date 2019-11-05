import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ButtonGroup from './button-group';
import Icon from '../icon';

/**
 * @visibleName Button 按钮
 */
class Button extends React.Component {

  static propTypes = {
    /**
     * 按钮风格
     */
    theme: PropTypes.oneOf(['primary', 'default', 'text']),
    /**
     * 块级按钮
     */
    block: PropTypes.bool,
    /**
     * 圆角，如果只有图标，则渲染为圆形按钮
     */
    round: PropTypes.bool,
    /**
     * 按钮尺寸
     */
    size: PropTypes.oneOf(['large', 'default', 'small']),
    /**
     * @ignore
     */
    htmlType: PropTypes.oneOf(['submit', 'button', 'reset']),
    /**
     * loading，指定后会覆盖 icon 参数，显示 loading 图标
     * @ignore
     */
    loading: PropTypes.bool,
    /**
     * 图标，也可直接在内部使用 Icon
     */
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    /**
     * 后置图标
     */
    suffixIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    /**
     * 禁用
     */
    disabled: PropTypes.bool,
    /**
     * 自动宽度，不设置最小宽度
     */
    autoWidth: PropTypes.bool,
  };

  static defaultProps = {
    theme: 'default',
    size: 'default',
    loading: false,
    round: false,
    block: false,
    disabled: false,
    autoWidth: false,
  };

  static contextTypes = { ...ButtonGroup.childContextTypes };

  getContextVal(key) {
    return typeof this.context === 'object' ? this.context[key] : undefined;
  }

  getContextOrPropVal(key) {
    const contextValue = this.getContextVal(key);
    return contextValue || this.props[key];
  }

  onClick = e => {
    const { loading, disabled, onClick } = this.props;
    if (loading || disabled) {
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };

  render = () => {
    const {
      // type: propType,
      // size: propSize,
      // disabled: propDisabled,
      // block,
      children: propChildren,
      round,
      className,
      htmlType,
      icon,
      suffixIcon,
      ghost,
      loading,
      autoWidth,
      ...others
    } = this.props;

    const type = this.getContextOrPropVal('type');
    const theme = this.getContextOrPropVal('theme');
    const size = this.getContextOrPropVal('size');
    const block = this.getContextOrPropVal('block');
    const disabled = this.getContextOrPropVal('disabled');

    delete others.type;
    delete others.theme;
    delete others.size;
    // delete others.disabled;
    delete others.block;

    let buttonType;
    let buttonTheme = theme;

    if (['primary', 'default', 'text'].indexOf(type) > -1) {
      buttonTheme = type;
    } else {
      buttonType = htmlType || type || 'button';
    }

    let iconComponent;
    let suffixIconComponent;

    if (icon) {
      if (typeof icon === 'string') {
        iconComponent = <Icon type={icon} />;
      } else {
        iconComponent = icon;
      }
    }

    if (suffixIcon) {
      if (typeof suffixIcon === 'string') {
        suffixIconComponent = <Icon type={suffixIcon} />;
      } else {
        suffixIconComponent = suffixIcon;
      }
    }

    if (loading) {
      iconComponent = <Icon type="loading_gradient" />;
    }

    const childrenCount = React.Children.count(propChildren);
    let children = [];
    let noText;

    React.Children.forEach(propChildren, function (child, i) {
      if (child.type === Icon && i === 0) {
        iconComponent = child;
      } else if (child.type === Icon && i === childrenCount - 1) {
        suffixIconComponent = child;
      } else {
        children.push(child);
      }
    });

    if (children.length === 0) {
      noText = true;
    } else {
      children = <span>{children}</span>;
    }

    const classes = classNames(className, 'ten-button', {
      'ten-button--round': round,
      'ten-button--notext': noText,
      'ten-button--loading': loading,
      'ten-button--block': block,
      'ten-button--disabled': disabled,
      'ten-button--autowidth': autoWidth,
      [`ten-button--size-${size}`]: size,
      [`ten-button--type-${buttonTheme}`]: buttonTheme,
    });

    if (others.href !== undefined) {
      return (
        <a
          {...others}
          className={classes}
          onClick={this.handleClick}
        >
          {iconComponent}
          {children}
          {suffixIconComponent}
        </a>
      );
    }


    return (

      <button
        {...others}
        type={buttonType}
        className={classes}
        onClick={this.onClick}
      >
        {iconComponent}
        {children}
        {suffixIconComponent}
      </button>
    );

  };

}


export default Button;

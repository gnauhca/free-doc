import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function getSrc(rtx, src) {
  if (rtx) {
    return `http://dcloud.oa.com/Public/Avatar/${rtx}.png`;
  }
  
  return src || '';
}

export default class Avatar extends React.Component {
  static defaultProps = {
    type: 'round', // square 方形，round 圆形
    size: 'defalut'
  };

  static propsType = {
    type: PropTypes.oneOf(['square', 'round']),
    size: PropTypes.oneOf(['large', 'default', 'small']),
    className: PropTypes.className,
    rtx: PropTypes.string,
    src: PropTypes.string
  };

  prefixCls = 'spfx-avatar';

  constructor(props) {
    super(props);
    this.onError = this.onError.bind(this);
    this.state = {
      src: getSrc(props.rtx, props.src),
      error: false
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) { // eslint-disable-line
    const newSrc = getSrc(nextProps.rtx, nextProps.src);
    if (newSrc !== this.state.src) {
      this.setState({ src: newSrc, error: false });
    }
  }

  onError() {
    this.setState({ error: true });
  }

  render() {
    const { src: propSrc, type, size, className, width, ...others } = this.props;
    const { src, error } = this.state;

    const extraCls = classNames({
      [`${this.prefixCls}__lg`]: size === 'large',
      [`${this.prefixCls}__square`]: type === 'square',
      [`${this.prefixCls}__default`]: error || !src
    });

    const classes = classNames(this.prefixCls, className, extraCls);

    let style = {};

    // custom width
    if (width) {
      style = {
        width
      };
    }

    return (
      <span className={classes} style={style} {...others}>
        {
          !error && src &&
          <img src={src} alt="user avatar" onError={this.onError} />
        }
      </span>
    );
  }
}

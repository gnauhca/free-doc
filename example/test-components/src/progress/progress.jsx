import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function getCirclePath(radius, lineWidth) {
  const halfLineWidth = lineWidth / 2;
  const drawRadius = radius - halfLineWidth;
  const path = `
    M ${radius} ${halfLineWidth} 
    A ${drawRadius} ${drawRadius} 0 0 1 ${radius} ${radius + drawRadius}
    A ${drawRadius} ${drawRadius} 0 0 1 ${radius} ${halfLineWidth}
  `;

  return path;
}

/**
 * @visibleName Progress 进度条
 */
class Progress extends React.Component {

  static propTypes = {
    inline: PropTypes.bool,
    type: PropTypes.oneOf(['bar', 'circle']),
    /**
     * 获取进度条数值文本，默认使用 value 转换为百分比形式
     */
    valueText: PropTypes.func,
    /**
     * 提醒文字
     */
    message: PropTypes.string,
    size: PropTypes.oneOf(['default', 'large']),
    /**
     * 0 - 1
     */
    value: PropTypes.number,

  };

  static defaultProps = {
    type: 'bar',
    inline: false,
    valueText: v => parseInt(v * 100) + '%',
    size: 'default'
  };

  static getDerivedStateFromProps(nextProps) {
    const { value: propValue } = nextProps;
    const value = Math.min(Math.max(0, propValue), 1);
    return { value };
  }

  state = {
    value: 0
  };

  render() {
    const { inline, type, size, valueText, value: propValue, className: propClassName, message, ...others } = this.props;
    const { value } = this.state;
    const showText = valueText(value);

    const percent = parseInt(value * 100);

    const className = classNames(
      propClassName,
      'ten-progress',
      `ten-progress--size-${size}`,
      `ten-progress--type-${type}`,
      {
        'ten-progress--inline': inline,
        'ten-progress--block': !inline
      }
    );

    let progress;


    if (type === 'bar') {
      progress = (
        <div>
          <div className="ten-progress__bar">
            <div className="ten-progress__bar-inner" style={{ width: percent + '%' }} />
          </div>
          <span className="ten-progress__valuetext">{showText}</span>
        </div>
      );
    } else {
      // circle
      const boxWidth = 146;
      const lineWidth = 8;
      const path = getCirclePath(boxWidth / 2, lineWidth);
      const pathLen = 433.54; // Math.PI * 2 * (boxWidth - lineWidth) / 2;
      const dashArray = `${pathLen} ${pathLen}`;
      const dashOffset = pathLen * (1 - value);

      progress = (
        <div>
          <svg
            viewBox={`0 0 ${boxWidth} ${boxWidth}`}
          >
            <path
              className="ten-progress__path-bg"
              d={path}
              fill="none"
              strokeWidth={lineWidth}
            />

            <path
              className="ten-progress__path-value"
              d={path}
              fill="none"
              strokeWidth={lineWidth}
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
            />
          </svg>
          <span className="ten-progress__valuetext">{showText}</span>
        </div>
      );
    }

    return (
      <div className={className} {...others}>
        {progress}
        {
          message &&
          <p className="ten-progress__message">{ message }</p>
        }
      </div>
    );
  }
}

export default Progress;

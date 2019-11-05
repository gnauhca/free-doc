import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import svgMap from './svg/index.json';

// console.log(svgMap);
// console.log(Object.keys(svgMap));

/* eslint-disable */
svgMap['loading_gradient_disabled'] = svgMap['loading_gradient'].replace(/#fff/g, '#c0c0c0').replace(/loading_gradient/g, 'loading_gradient_disabled');
svgMap['loading_gradient_primary'] = svgMap['loading_gradient'].replace(/#fff/g, '#0052D9').replace(/loading_gradient/g, 'loading_gradient_primary');
svgMap['loading_gradient_default'] = svgMap['loading_gradient'].replace(/#fff/g, '#333').replace(/loading_gradient/g, 'loading_gradient_default');
/* eslint-enable */


let loadingIconId = 0;

class Icon extends React.Component {

  static propTypes = {
    /** icon name */
    type: PropTypes.string
  };

  render() {
    const { type, className: propClassName, ...others } = this.props;
    // const useTag = `<use xlink:href="#icon-${type}" />`;
    const className = classNames(`ten-icon ten-icon--${type}`, propClassName);

    let svg = svgMap[type];
    if (type === 'loading_gradient') {
      svg = svg.replace(/loading_gradient/g, `loading_gradient${loadingIconId++}`);
    }

    /* eslint-disable */
    return (
      <i
        className={className}
        { ...others } dangerouslySetInnerHTML={{ __html: svg }}>
        {/* <svg fill="currentColor" aria-hidden="true" dangerouslySetInnerHTML={{ __html: useTag }} /> */}
      </i>
    );
    /* eslint-enable */
  }
}

export default Icon;

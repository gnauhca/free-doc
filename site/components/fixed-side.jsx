import React from 'react';
import classNames from 'classnames';

export default class FixedSide extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      cssTop: props.top
    };
  }

  componentDidMount() {
    this.onScroll();
    this.onResize();
    window.addEventListener('resize', this.onResize);
    window.addEventListener('scroll', this.onScroll);
  }

  componentDidUpdate(prevProps) {
    if (this.props.top !== prevProps.top) {
      this.updatePosition();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('scroll', this.onScroll);
  }

  updatePosition() {
    const winScrollY = window.pageYOffset || window.scrollY || 0;
    const { top, bottom } = this.props;
    const headerOffset = Math.min(top, winScrollY);
    const bottomOffset = Math.min(
      document.body.scrollHeight - window.innerHeight,
      Math.max(
        window.innerHeight +
          winScrollY -
          (document.body.scrollHeight - bottom),
        0
      )
    );
    const caledTop = top + (headerOffset + bottomOffset) * -1;
    this.setState({
      cssTop: caledTop
    });
  }

  onResize = () => {
    this.onScroll();
  };

  onScroll = () => {
    this.updatePosition();
  };

  render() {
    const { children, className: propClassName } = this.props;
    const { cssTop } = this.state;
    const className = classNames(propClassName, 'spfx-fixed-side');
    return (
      <div className={className} style={{ top: `${cssTop}px` }}>
        {children}
      </div>
    );
  }
}

import React from 'react';
import PropTypes from 'prop-types';
import { Popup, Button } from 'ten-design-react';
import classNames from 'classnames';
import { ChromePicker } from 'react-color';

export default class ColorPicker extends React.Component {

  static propTypes = {
    color: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    onChange: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      curColor: props.color || '#000000',
      curColorRgba: props.color || '#000000',
      show: false
    };
  }

  onColorChange = (color) => {
    color.rgba = color.rgb;
    this.setState({
      curColor: color,
      curColorRgba: color.rgb 
    });
  }

  onConfirm = () => {
    const { onChange } = this.props;
    const { curColor } = this.state;

    onChange && onChange(curColor);
    this.onPopupHide();
  }

  onPopupShow = () => {
    this.setState({
      curColor: this.props.color || '#000000',
      curColorRgba: this.props.color.rgb ? this.props.color.rgb : this.props.color || '#000000',
      show: true
    });
  }

  onPopupHide = () => {
    this.setState({
      show: false
    });
  }

  render() {
    const { children } = this.props;
    const { show, curColorRgba } = this.state;
    
    // const curColor2 = 'rgba(12,55,199,0.2)'
    let popupContent = '';

    if (show) {
      popupContent = (
        <div>
          <ChromePicker color={curColorRgba} onChangeComplete={this.onColorChange}></ChromePicker>
          <Button theme="primary" size="small" onClick={this.onConfirm}>确定</Button>
        </div>
      )
    }

    return (
      <Popup
        className="spfx-theme-config-color"
        direction="bottom left"
        triggerType="click"
        content={popupContent}
        show={show}
        onShow={this.onPopupShow}
        onHide={this.onPopupHide}
      >
        {children}
      </Popup>
    );
  }
}

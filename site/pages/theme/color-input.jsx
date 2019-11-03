import React from 'react';
import { Input } from 'ten-design-react';

export default class ColorInput extends React.Component {

  static getDeri

  render() {
    const { value } = this.state;
    
    return (
      <Input value={value} />
    )
  }
}

import React from 'react';
import { mount } from 'enzyme';

describe('Progress', () => {
  it('base demo works fine', () => {
    const Demo = require('../demos/base').default;
    const wrapper = mount(<Demo />);
    expect(wrapper).toMatchSnapshot();
  });
  it('circle demo works fine', () => {
    const Demo = require('../demos/circle').default;
    const wrapper = mount(<Demo />);
    expect(wrapper).toMatchSnapshot();
  });
});

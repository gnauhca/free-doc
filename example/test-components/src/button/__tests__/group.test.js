import React from 'react';
import { mount, render, shallow } from 'enzyme';

describe('Button Group', () => {
  it('renders correctly', () => {
    const Demo = require('../demos/group').default;
    const wrapper = mount(<Demo></Demo>);
    expect(wrapper).toMatchSnapshot();
  });
});

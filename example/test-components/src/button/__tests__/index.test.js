import React from 'react';
import { mount, render, shallow } from 'enzyme';
import Button from '..';
import Icon from '../../icon';

describe('Button', () => {

  it('renders correctly', () => {
    const wrapper = render(<Button>button text</Button>);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders theme correctly', () => {
    let theme = 'default';
    let wrapper;
    wrapper = shallow(<Button>button text</Button>);
    expect(wrapper.find('button').hasClass(/type-default/)).toBeTruthy();

    wrapper = shallow(<Button theme={theme}>button text</Button>);
    expect(wrapper.find('button').hasClass(/type-default/)).toBeTruthy();

    theme = 'primary';
    wrapper = shallow(<Button theme={theme}>button text</Button>);
    expect(wrapper.find('button').hasClass(/type-primary/)).toBeTruthy();
  });

  it('renders size correctly', () => {
    let size = 'default';
    let wrapper;
    wrapper = shallow(<Button>button text</Button>);
    expect(wrapper.find('button').hasClass(/size-default/)).toBeTruthy();

    wrapper = shallow(<Button size={size}>button text</Button>);
    expect(wrapper.find('button').hasClass(/size-default/)).toBeTruthy();

    size = 'large';
    wrapper = shallow(<Button size={size}>button text</Button>);
    expect(wrapper.find('button').hasClass(/size-large/)).toBeTruthy();
  });

  it('supports specify icon by string', () => {
    const wrapper = shallow(<Button icon="delete">button text</Button>);
    const wrapperSuffix = shallow(<Button suffixIcon="delete">button text</Button>);
    expect(wrapper).toMatchSnapshot();
    expect(wrapperSuffix).toMatchSnapshot();
  });

  it('supports specify icon by node', () => {
    const wrapper1 = shallow(<Button icon={<Icon type="delete" />}>button text</Button>);
    const wrapper2 = shallow(<Button icon="delete">button text</Button>);

    const wrapperSuffix1 = shallow(<Button suffixIcon={<Icon type="delete" />}>button text</Button>);
    const wrapperSuffix2 = shallow(<Button suffixIcon="delete">button text</Button>);

    expect(wrapper1.html()).toEqual(wrapper2.html());
    expect(wrapperSuffix1.html()).toEqual(wrapperSuffix2.html());
  });

  it('renders loading icon when loading', () => {
    const wrapper = shallow(<Button loading={true} icon={<Icon type="delete" />}>button text</Button>);
    expect(wrapper).toMatchSnapshot();
  });

  it('shouldn\'t responses click when loading or disabled', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Button onClick={onClick}>button text</Button>);

    wrapper.find('button').simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
    wrapper.setProps({ disabled: true });

    onClick.mockClear();
    wrapper.find('button').simulate('click');
    expect(onClick).toHaveBeenCalledTimes(0);
  });

  it('support old theme api "type"', () => {
    const wrapper = mount(<div>
      <Button type="primary">主按钮</Button>
      <Button type="default">次按钮</Button>
      <Button type="text">文字按钮</Button>

      <Button type="submit">submit</Button>
    </div>);

    expect(wrapper).toMatchSnapshot();
  });
});

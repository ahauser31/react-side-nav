import React from 'react';
import { shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import { Chevron, Icon } from './side-nav-addons';

describe('Chevron', () => {
  test('should render as a font awesome chevron left icon by default', () => {
    const result = shallow(<Chevron />);
    expect(result.name()).toEqual('i');
    expect(result.hasClass('fa-chevron-left')).toEqual(true);
    // expect(result.hasClass('fa')).toEqual(true);
  });

  test('should render as a font awesome chevron down icon if expanded = true', () => {
    const result = TestRenderer.create(<Chevron expanded />).root;
    expect(result.props.expanded).toEqual(true);
    expect(result.findByType('i').props.className).toContain('fa-chevron-down');
  });

  test('should include custom classnames', () => {
    const result = shallow(<Chevron className="chevron-test" />);
    expect(result.hasClass('chevron-test')).toEqual(true);
    expect(result.hasClass('fa-chevron-left')).toEqual(true);
    // expect(result.hasClass('fa')).toEqual(true);
  });
});

describe('Chevron', () => {
  test('should render as a font awesome icon', () => {
    const result = shallow(<Icon className="fa-phone" />);
    expect(result.name()).toEqual('i');
    expect(result.hasClass('fa-phone')).toEqual(true);
    // expect(result.hasClass('fa')).toEqual(true);
  });
});

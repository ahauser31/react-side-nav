import React from 'react';
import { shallow } from 'enzyme';
import SideNav from './side-nav';

describe('<SideNav />', () => {
  const menuItems = [
    {
      id: 1,
      label: 'Item 1',
      icon: 'fa-battery-half',
      animationTime: 250,
      items: [
        {
          id: 11,
          label: 'Item 1.1',
          icon: 'fa-car',
          link: '/item11',
        },
        {
          id: 12,
          label: 'Item 1.2',
          icon: 'fa-bullhorn',
          link: '/item12',
        },
      ],
    },
    {
      id: 2,
      label: 'Item 2',
      icon: 'fa-camera',
      link: '/item2',
    },
    {
      id: 3,
      label: 'Item 3',
      icon: 'fa-check-square',
      link: '/item3',
    },
    {
      id: 4,
      label: 'Item 4',
      icon: 'fa-database',
      items: [
        {
          id: 41,
          label: 'Item 4.1',
          icon: 'fa-paw',
          items: [
            {
              id: 411,
              label: 'Item 4.1.a',
              icon: 'fa-random',
              link: '/item41/a',
            },
            {
              id: 412,
              label: 'Item 4.1.b',
              icon: 'fa-sign-in',
              link: '/item41/b',
            },
          ],
        },
        {
          id: 42,
          label: 'Item 4.2',
          icon: 'fa-user',
          link: '/item42',
        },
        {
          id: 43,
          label: 'Item 4.3',
          icon: 'fa-gear',
          link: '/item43',
        },
      ],
    },
  ];

  test('should render a basic empty SideNav with default theme', () => {
    const result = shallow(<SideNav />);
    expect(result.name()).toEqual('div');
    expect(result.hasClass('side-nav')).toEqual(true);
    expect(result.hasClass('default-theme')).toEqual(true);
  });

  test('should render a basic empty SideNav with a custom theme', () => {
    const result = shallow(<SideNav className="custom-theme" />);
    expect(result.name()).toEqual('div');
    expect(result.hasClass('side-nav')).toEqual(true);
    expect(result.hasClass('custom-theme')).toEqual(true);
  });

  test('should render a SideNav with default theme and a list of items', () => {
    const result = shallow(<SideNav items={menuItems} />);
    expect(result.children()).toHaveLength(4);
    expect(result.childAt(0).name()).toEqual('SideNavItem');
  });

  test('should active the item with a link passed using the activeItem prop', () => {
    const result = shallow(<SideNav items={menuItems} />);
    expect(result.state('activeItemLink')).toEqual(null);
    expect(result.state('items')[3].items[0].items[1].active).toEqual(false);
    result.setProps({ activeItem: '/item41/b' });
    expect(result.state('activeItemLink')).toEqual('/item41/b');
    expect(result.state('items')[3].items[0].items[1].active).toEqual(true);
  });

  test('should active the item with a link passed using the activeItem prop when mounting', () => {
    const result = shallow(<SideNav items={menuItems} activeItem="/item41/b" />);
    expect(result.state('activeItemLink')).toEqual('/item41/b');
    expect(result.state('items')[3].items[0].items[1].active).toEqual(true);
  });

  test('should correctly change a prop that is not the activeItem', () => {
    const result = shallow(<SideNav items={menuItems} className="custom1" />);
    expect(result.prop('className')).toEqual('side-nav custom1');
    result.setProps({ className: 'custom2' });
    expect(result.prop('className')).toEqual('side-nav custom2');
  });

  test('should expand an item that was clicked on', () => {
    const result = shallow(<SideNav items={menuItems} />);
    expect(result.state('items')[3].items[0].expanded).toEqual(false);
    // const childWrapper = result.childAt(0);
    const onItemClick = result.childAt(0).prop('onItemClick'); // Get the onClickHandler generating function from any child
    onItemClick(result.state('items')[3].items[0].id)({
      stopPropagation: () => {},
      preventDefault: () => {},
      nativeEvent: { stopImmediatePropagation: () => {} },
    });
    expect(result.state('items')[3].items[0].expanded).toEqual(true);
  });

  test('should animate a parent item that was clicked on', () => {
    const result = shallow(<SideNav items={menuItems} />);
    expect(result.state('items')[0].animationState).toEqual(0);
    const onItemClick = result.childAt(0).prop('onItemClick'); // Get the onClickHandler generating function from any child
    onItemClick(result.state('items')[0].id)({
      stopPropagation: () => {},
      preventDefault: () => {},
      nativeEvent: { stopImmediatePropagation: () => {} },
    });
    expect(result.state('items')[0].animationState).toEqual(1);
  });
});

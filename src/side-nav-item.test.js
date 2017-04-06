import React from 'react';
import { shallow } from 'enzyme';
import SideNavItem from './side-nav-item';

describe('<SideNavItem />', () => {
  const TestComponent = () => (<div />);

  test('should render nothing if a link component is not provided and a link is passed in', () => {
    const result = shallow(<SideNavItem
      label="TestLinkItem"
      id="item1"
      onItemClick={() => (() => {})}
      level={10}
      link="/test/"
    />);
    expect(result.prop('className')).toEqual('side-nav-item level-10');
    expect(result.at(0).children()).toHaveLength(0);
  });

  test('should render a link component if a link is passed in (no icon)', () => {
    const result = shallow(<SideNavItem
      label="TestLinkItem"
      id="item1"
      onItemClick={() => (() => {})}
      level={0}
      link="/test/"
      linkComponent={TestComponent}
    />);
    expect(result.find('TestComponent').prop('label')).toEqual('TestLinkItem');
    expect(result.find('TestComponent').prop('icon')).toEqual(null);
  });

  test('should render a link component with an icon string', () => {
    const result = shallow(<SideNavItem
      label="TestLinkItem"
      id="item1"
      onItemClick={() => (() => {})}
      level={0}
      link="/test/"
      linkComponent={TestComponent}
      icon="someIcon"
    />);
    expect(result.find('TestComponent').prop('icon')).toEqual('someIcon side-nav-icon');
  });

  test('should render with correct label and level', () => {
    const result = shallow(<SideNavItem
      label="TestLinkItem"
      id="item1"
      onItemClick={() => (() => {})}
      level={3}
    />);
    expect(result.find('div.side-nav-item-title').childAt(0).text()).toEqual('TestLinkItem');
  });

  test('should render with correct icon', () => {
    const result = shallow(<SideNavItem
      label="TestLinkItem"
      id="item1"
      onItemClick={() => (() => {})}
      level={3}
      iconComponent={TestComponent}
      icon="test-icon"
    />);
    expect(result.find('div.side-nav-item-title').find('TestComponent').prop('className')).toEqual('side-nav-icon test-icon');
  });

  test('should render with correct chevron', () => {
    const result = shallow(<SideNavItem
      label="TestLinkItem"
      id="item1"
      onItemClick={() => (() => {})}
      level={3}
      chevronComponent={TestComponent}
      expanded={false}
    />);
    expect(result.find('div.side-nav-item-title').find('TestComponent').prop('className')).toEqual('side-nav-chevron');
    expect(result.find('div.side-nav-item-title').find('TestComponent').prop('expanded')).toEqual(false);
    result.setProps({ expanded: true });
    expect(result.find('div.side-nav-item-title').find('TestComponent').prop('expanded')).toEqual(true);
  });

  test('should render with an empty children div if no children present', () => {
    const result = shallow(<SideNavItem
      label="TestLinkItem"
      id="item1"
      onItemClick={() => (() => {})}
      level={3}
      items={[]}
    />);
    expect(result.find('side-nav-item-children').children()).toHaveLength(0);
  });

  test('should render children correctly', () => {
    const result = shallow(<SideNavItem
      label="TestLinkItem"
      id="item1"
      onItemClick={() => (() => {})}
      level={3}
      items={[
        {
          id: 31,
          label: 'Item 3.1',
          icon: 'fa-user',
          link: '/item31',
          expanded: false,
          active: false,
        },
        {
          id: 32,
          label: 'Item 3.2',
          icon: 'fa-gear',
          link: '/item32',
          expanded: true,
          active: false,
        },
      ]}
    />);
    expect(result.find('div.side-nav-item-children').children()).toHaveLength(2);
    expect(result.find('div.side-nav-item-children').childAt(0).is('SideNavItem')).toEqual(true);
    expect(result.find('div.side-nav-item-children').childAt(0).prop('label')).toEqual('Item 3.1');
    expect(result.find('div.side-nav-item-children').childAt(1).prop('label')).toEqual('Item 3.2');
    expect(result.find('div.side-nav-item-children').childAt(1).prop('expanded')).toEqual(true);
  });
});

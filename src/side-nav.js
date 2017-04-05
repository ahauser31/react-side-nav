import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import SideNavItem from './side-nav-item';
import { createItemTree, toggleExpandedItemWithId, activateItemWithLink } from './side-nav-helpers';
import './../styles/side-nav.scss';
import './../styles/default-theme.scss';

/**
 * SideNav
 */
class SideNav extends Component {
  state = {
    items: [],
    activeItemLink: null,
  };

  // Create Item tree with additional properties
  componentWillMount() {
    const items = this.props.items ? createItemTree(this.props.items) : [];
    this.setState({ items });
  }

  componentWillReceiveProps(newProps) {
    if (newProps && newProps.activeItem) {
      const items = activateItemWithLink(newProps.activeItem, this.state.items);
      this.setState({ activeItemLink: newProps.activeItem, items });
    }
  }

  onItemClick = id => ((e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    e.preventDefault();
    this.toggleItem(id);
  });

  toggleItem = (id) => {
    const items = toggleExpandedItemWithId(id, this.state.items);
    this.setState({ items });
  };

  renderItems = () => (
    this.state.items.map(item =>
      <SideNavItem
        key={item.id}
        level={0}
        linkComponent={this.props.linkComponent}
        chevronComponent={this.props.chevronComponent}
        iconComponent={this.props.iconComponent}
        onItemClick={this.onItemClick}
        {...item}
      />)
  );

  render = () => (
    <div className={classNames('side-nav', this.props.className, { 'default-theme': !this.props.className })} >
      { this.renderItems() }
    </div>
  )
}

SideNav.propTypes = {
  linkComponent: PropTypes.element,
  items: PropTypes.arrayOf(PropTypes.object),
  activeItem: PropTypes.string,  // eslint-disable-line react/no-unused-prop-types
  className: PropTypes.string,
  chevronComponent: PropTypes.element,
  iconComponent: PropTypes.element,
};

SideNav.defaultProps = {
  items: null,
  activeItem: null,
  className: null,
  chevronComponent: null,
  iconComponent: null,
  linkComponent: null,
};

export default SideNav;

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * SideNavItem
 */
const SideNavItem = props => (
  props.link ?
    (
      <div className={classNames('side-nav-item', `level-${props.level}`, { active: props.active })} >
        { props.linkComponent
          ? React.createElement(props.linkComponent, {
            to: props.link,
            label: props.label,
            icon: props.icon ? `${props.icon} side-nav-icon` : null,
            className: 'side-nav-item-link',
          })
          : null
        }
      </div>
    ) :
    (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div
        className={classNames(
          'side-nav-item',
          `level-${props.level}`,
          { collapsed: !props.expanded, expanded: props.expanded, active: props.active },
        )}
        onClick={props.onItemClick(props.id)}
      >
        <div className={classNames('side-nav-item-title', { animateIn: props.animationState >= 1 }, { animateOut: props.animationState === 2 })}>
          { props.iconComponent && props.icon
            ? React.createElement(props.iconComponent, { className: classNames('side-nav-icon', props.icon) })
            : null
          }
          {props.label}
          {props.chevronComponent
            ? React.createElement(
              props.chevronComponent,
              {
                expanded: props.expanded || props.active,
                className: 'side-nav-chevron',
              },
            )
            : null
          }
        </div>

        <div className="side-nav-item-children">
          { props.items && Array.isArray(props.items)
            ? props.items.map(item =>
              (<SideNavItem
                key={item.id}
                level={props.level + 1}
                linkComponent={props.linkComponent}
                chevronComponent={props.chevronComponent}
                iconComponent={props.iconComponent}
                onItemClick={props.onItemClick}
                {...item}
              />))
            : null
          }
        </div>
      </div>
    )
);

SideNavItem.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onItemClick: PropTypes.func.isRequired,
  level: PropTypes.number.isRequired,
  linkComponent: PropTypes.func,
  link: PropTypes.string,
  icon: PropTypes.string,
  active: PropTypes.bool,
  expanded: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.object),
  chevronComponent: PropTypes.func,
  iconComponent: PropTypes.func,
  animationState: PropTypes.number,
};

SideNavItem.defaultProps = {
  link: null,
  icon: null,
  active: false,
  expanded: false,
  items: null,
  chevronComponent: null,
  iconComponent: null,
  linkComponent: null,
  animationState: 0,
};

export default SideNavItem;

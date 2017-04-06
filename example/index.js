import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { SideNav, Chevron, Icon } from '../src';

const menuItems = [
  { id: 1,
    label: 'Item 1',
    icon: 'fa-battery-half',
    items: [
      { id: 11,
        label: 'Item 1.1',
        icon: 'fa-car',
        link: '/item11',
      },
      { id: 12,
        label: 'Item 1.2',
        icon: 'fa-bullhorn',
        link: '/item12',
      },
    ],
  },
  { id: 2,
    label: 'Item 2',
    icon: 'fa-camera',
    link: '/item2',
  },
  { id: 3,
    label: 'Item 3',
    icon: 'fa-check-square',
    link: '/item3',
  },
  { id: 4,
    label: 'Item 4',
    icon: 'fa-database',
    items: [
      { id: 41,
        label: 'Item 4.1',
        icon: 'fa-paw',
        items: [
          { id: 411,
            label: 'Item 4.1.a',
            icon: 'fa-random',
            link: '/item41/a',
          },
          { id: 412,
            label: 'Item 4.1.b',
            icon: 'fa-sign-in',
            link: '/item41/b',
          },
        ],
      },
      { id: 42,
        label: 'Item 4.2',
        icon: 'fa-user',
        link: '/item42',
      },
      { id: 43,
        label: 'Item 4.3',
        icon: 'fa-gear',
        link: '/item43',
      },
    ],
  },
];

const NavLink = props => (<a href={props.to} {...props}><i className={classNames('fa', props.icon)} />{props.label}</a>);

NavLink.propTypes = {
  to: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string,
};

NavLink.defaultProps = {
  to: '#',
  icon: '',
  label: '',
};

class Testcontainer extends Component {
  state = {
    activate: null,
  };

  clickActivate = () => {
    const activate = '/item41/a';

    this.setState({ activate });
  };

  render() {
    return (
      <div style={{ maxWidth: '13.75rem', padding: 0 }}>
        <SideNav
          items={menuItems}
          activeItem={this.state.activate}
          linkComponent={NavLink}
          chevronComponent={Chevron}
          iconComponent={Icon}
        />
        <button onClick={() => { this.clickActivate(); }}>Click to activate the item with the link &quot;/item41/a&quot;</button>
      </div>
    );
  }
}

ReactDOM.render(<Testcontainer />, document.getElementById('root'));

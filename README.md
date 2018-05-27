
# react-side-nav &middot; [![Build Status](https://travis-ci.org/ahauser31/react-side-nav.svg?branch=master)](https://travis-ci.org/ahauser31/react-side-nav) [![codecov](https://codecov.io/gh/ahauser31/react-side-nav/branch/master/graph/badge.svg)](https://codecov.io/gh/ahauser31/react-side-nav)


react-side-nav is a JavaScript react UI component that displays a navigation side bar. It supports custom styling, custom icons & chevrons and works with react-router. Add-on components are provided to support Font Awesome for the icons & chevrons.

![img](https://cloud.githubusercontent.com/assets/8348199/24691668/8ac90524-1a07-11e7-8b7e-3fc57d923be2.png)

## New version

* react-side-nav was updated to the newest dependencies using webpack 4 and react 16 (These changes may cause code to break for some users still using the old versions)
* The default theme is no longer included in the js bundle and has to be included separately (see style guide below)
* New animation function is included to animate the click on a parent node
* Update for FontAwesome 5 - Icon properties must now specify icon style, Chevron add-on uses solid style
* Fixed bug that caused a side nav that gets a activeItem prop passed in to not activate that item when mounting

### Installation

To get started with react-side-nav, simply install it with npm:

```bash
npm i react-side-nav -S
```

### Usage

Include the main component and add-on icon components (optional) as well as the default theme (optional)

```js
import { SideNav, Chevron, Icon } from 'react-side-nav';
```

The actual nav menu structure is defined via a JavaScript array / JSON (support for direct definition in a render method not included yet);
each entry in the menu tree can either be a "leaf", meaning an object that has a routing link or a "branch" that is parent to multiple other
branches or leaves. A leaf can also be on the top level, i.e. be parentless. A more detailed explanation about the possible fields of the nav
menu tree can be found below. See the following array definition to illustrate this concept:

```js
const menuItems = [
  { id: 1,
    label: 'Item 1',
    icon: 'fas fa-battery-half',
    items: [
      { id: 11,
        label: 'Item 1.1',
        icon: 'fas fa-car',
        link: '/item11',
      },
      { id: 12,
        label: 'Item 1.2',
        icon: 'fas fa-bullhorn',
        link: '/item12',
      },
    ],
  },
];
```

The component must be passed a "link" component so it knows how to render the leaves; to support react-router and Font Awesome icons, the following
component could be used:

```js
const NavLink = props => (<Link to={props.to} {...props}><i className={`fa ${props.icon}`} />{props.label}</Link>);
```

Alternatively, for non react-router links:

```js
const NavLink = props => (<a href={props.to} {...props}><i className={`fa ${props.icon}`} />{props.label}</a>);
```

With the nav menu tree and the link component defined, the side nav is ready for use:

```js
<SideNav
  items={menuItems}
  linkComponent={NavLink}
  chevronComponent={Chevron}
  iconComponent={Icon}
/>
```

All SideNav menu items have an `expanded` and an `active` state; the `expanded` state indicates whether a branch item is expanded (showing all its children) or not; the `expanded` state is automatically toggled by the user clicking "branch" items. The `active` state can be used to indicate the currently active route (if some kind of routing, e.g. react-router is used); by passing in a valid link using the `activeItem` prop of SideNav, the targeted leaf that matches this link will be marked active and all its parent elements will be expanded. Elements expanded because of the `active` state cannot be collapsed to always indicate the active route. The link to be passed in as a prop can be gotten from the routing component if this functionality is supported by it; alternatively, the user can access the history API of the browser to extract that information if required.

## To do

* Better documentation
* Allow direct definition of the nav menu by the user by placing SideNavItem instances as children of the SideNav instance (currently only JSON definition possible)
* Include example as well as more options for animation function

### Developers guide

SideNav has the following props:

| Prop     | Default    | Description                                          |
| --------- | ---------- | ---------------------------------------------------- |
| className | null       | CSS `class` that is to be applied for styling the SideNav; if not specified, the default theme will be used (see style guide below ) |
| items | null | Nav menu tree object, see below for structure of this object |
| linkComponent | null | React component used to render the leaves of the nav tree that contain actual navigation links; If no link component is passed to the SideNav, leaves will not render. See below for props passed to link component |
| iconComponent | null | React component used to render the icons of the nav menu items; if no icon component is supplied, nav menu items will have no icons; See below for props passed to icon component |
| chevronComponent | null | React component used to render the chevrons (expanded / closed indicator) of the nav menu; if no chevron component is supplied, there will be no expanded / closed indicator for the nav menu items. See below for props passed to chevron component |
| activeItem | null | Link (string) that matches the link of a leaf element of the nav menu tree; if a match is found, the corresponding node is marked `active` and expanded |


SideNav items are defined using a JavaScript array; this array contains `item` objects that can have multiple children `item` elements. Actual navigation links have the `link` property and are called "leaves" in this documentation. A leaf (with a link) cannot have children elements, as this would cause conflicts with clicks on the respective entry. Each entry of the SideNav items array can have the following fields:

| Field        | Type            | Description                                 |
| ------------ | --------------- | ------------------------------------------- |
| id           | String or Number | ID if the element; used to identify elements, must be unique |
| label        | String           | Label to be displayed by the nav menu for the corresponding entry |
| icon         | String           | (optional) CSS `class` passed to the icon component (if provided) to render an icon for the corresponding entry |
| link         | String           | (only leaf entries) Link used for routing and passed to the Link component; depending on the application, this can be a full URL, a URL fragment or a hashtag anchor-link |
| animationTime| Number           | (only branch entries) Time (in ms) for running the click animation; if animation is not used, do not define this field|
| items        | Array<item>      | (only for branch entries) Array of children `item` elements |


To better understand how to use the chevron and icon components, the following table shows the props and definitions of the provided icon and chevron components; the user is of course free to use their own components, provided they support the props passed to them by the SideNav:

| Chevron props | Type | Description |
| ------------- | ---- | ----------- |
| className     | String | CSS `class` passed to the chevron for additional styling; SideNav will pass the class `side-nav-chevron` to the chevron |
| expanded      | Boolean | Value declares if the chevron should indicate and expanded or collapsed nav element |


This is the default chevron implementation (using the `className` package to compose CSS class names):

```js
const Chevron = props => (<i className={classNames('fa', props.className, { 'fa-chevron-left': !props.expanded, 'fa-chevron-down': props.expanded })}/>);
```


For the icon component:

| Icon props | Type | Description |
| ---------- | ---- | ----------- |
| className  | String | CSS `class` passed to the icon for styling; SideNav will pass the class name given by the `icon` field defined for the respective element; This implementation of the icon component is geared towards support of Font Awesome, which defines its icons by the CSS `class` on the `<i />` element |


Default implementation of the icon component:

```js
const Icon = props => (<i className={classNames('fa', props.className)} />);
```


For the animation function:

If a branch item has the property "animationTime" defined, a click on it will not only expand / collapse it, but also add the class "animateIn" to the node; after "animationTime" milliseconds, the class "animateOut" will be added as well.
After another "animationTime" milliseconds both classes "animateIn" and "animateOut" will be removed from the node

### Style guide

The component has a few styles inlined that are required for it to work; the default theme is no longer inlined from version 1.0.0 onwards to reduce the size of the component. If you want to use the default theme, please require / import it in your application:
```js
import './node_modules/react-side-nav/dist/themes.css';
```
Please also see [default-theme](/styles/default-theme.scss) for the default style definitions.

### Example

A small sample application is included and can be found [here](/example).
To run the sample, clone the repository, install the dependencies and run the example:

```bash
git clone https://github.com/ahauser31/react-side-nav.git
cd react-side-nav
npm i
npm start
```

### Credits

This small component was inspired by [Banomaster](https://github.com/banomaster) and his very nice component [react-sidemenu](https://github.com/banomaster/react-sidemenu) that unfortunately proved unsuited to what I had in mind;
To improve my own skills and as a programming exercise, I wrote SideNav instead of forking & fiddling with SideMenu.
Thank you @Banomaster for the excellent work!

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Chevron = props => (
  <i
    className={classNames('fa', props.className, { 'fa-chevron-left': !props.expanded, 'fa-chevron-down': props.expanded })}
  />
);

Chevron.propTypes = {
  className: PropTypes.string,
  expanded: PropTypes.bool,
};

Chevron.defaultProps = {
  className: '',
  expanded: false,
};

export const Icon = props => (<i className={classNames('fa', props.className)} />);

Icon.propTypes = {
  className: PropTypes.string,
};

Icon.defaultProps = {
  className: '',
};

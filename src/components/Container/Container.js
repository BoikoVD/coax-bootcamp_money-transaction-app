import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import classes from './Container.module.scss';

function Container({ children, className }) {
  const styles = classNames(classes.container, className);

  return (
    <div className={styles}>
      {children}
    </div>
  )
}

Container.propTypes = {
  children: PropTypes.any,
  className: PropTypes.any,
}

export default Container;
import React from 'react';
import classes from './NotFound.module.scss';

function NotFound() {

  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>
        404
      </div>
      <div className={classes.text}>
        Page not found
      </div>
    </div>
  )
}

export default NotFound;
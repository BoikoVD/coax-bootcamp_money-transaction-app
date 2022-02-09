import React from 'react';
import LogoImg from '../../assets/img/Citizens_Financial_Group_logo.svg'
import classes from './Logo.module.scss';

function Logo() {

  return (
    <div className={classes.logo} >
      <img src={LogoImg} alt='LOGO' />
    </div>
  )
}

export default Logo;
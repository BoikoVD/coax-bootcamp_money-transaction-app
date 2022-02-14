import React from 'react';
import PropTypes from 'prop-types';
import SendMoneyButton from '../SendMoneyButton/SendMoneyButton';
import AvatarIcon from '../../assets/icons/profile.svg';
import classes from './SmallContactCard.module.scss';

function SmallContactCard({ profile }) {

  return (
    <SendMoneyButton profile={profile} className={classes.button}>
      <div className={classes.avatar}>
        <img src={AvatarIcon} alt='Avatar' />
      </div>
      <div className={classes.firstName}>
        {profile.firstName}
      </div>
      <div className={classes.lastName}>
        {profile.lastName}
      </div>
    </SendMoneyButton>
  )
}

SmallContactCard.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    user: PropTypes.string,
    email: PropTypes.string,
    created_at: PropTypes.string,
    isLoading: PropTypes.bool
  })
};

export default SmallContactCard;
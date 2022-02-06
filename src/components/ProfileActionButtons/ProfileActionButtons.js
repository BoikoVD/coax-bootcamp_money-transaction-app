import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import classes from './ProfileActionButtons.module.scss';

function ProfileActionButtons({ isCurrent, id }) {
  const [isFriend, setIsFriend] = React.useState(false);
  const userProfiles = useSelector(state => state.userReducer.userProfiles);

  React.useEffect(() => {
    if (userProfiles.length > 0) {
      for (let i of userProfiles) {
        if (i.id === id) {
          setIsFriend(true);
        }
      };
    };
  }, [])

  if (isCurrent) {
    return (
      <Button
        type="primary"
        ghost
        size="small"
        className={classes.button}
      >
        Reset Password
      </Button>
    )
  } else {
    return (
      <div className={classes.buttonsWrapper}>
        {isFriend
          ?
          <>
            <Button
              type="primary"
              size="middle"
              className={classes.button}
            >
              Send money
            </Button>
            <Button
              type="primary"
              ghost
              size="small"
              className={classes.button}
            >
              Delete from contacts
            </Button>
          </>
          :
          <Button
            type="primary"
            size="middle"
            className={classes.button}
          >
            Add to your contacts
          </Button>}
      </div>
    )
  }
}

ProfileActionButtons.propTypes = {
  isCurrent: PropTypes.bool.isRequired,
  id: PropTypes.string
}

export default ProfileActionButtons;
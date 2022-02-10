import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import classes from './ContactActionButtons.module.scss';

function ContactActionButtons({ id }) {
  const [isFriend, setIsFriend] = React.useState(false);
  const userContacts = useSelector(state => state.userReducer.userContacts);

  React.useEffect(() => {
    if (userContacts.length > 0) {
      for (let i of userContacts) {
        if (i === id) {
          setIsFriend(true);
        }
      };
    };
  }, [id, userContacts]);

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
            danger
            size="small"
            className={classes.button}
          >
            Delete contact
          </Button>
        </>
        :
        <Button
          type="primary"
          size="middle"
          className={classes.button}
        >
          Add contact
        </Button>}
    </div>
  )
};

ContactActionButtons.propTypes = {
  id: PropTypes.string.isRequired
};

export default ContactActionButtons;
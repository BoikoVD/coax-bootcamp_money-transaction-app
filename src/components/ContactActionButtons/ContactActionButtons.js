import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { Button, Spin } from 'antd';
import classes from './ContactActionButtons.module.scss';
import SendMoneyButton from '../SendMoneyButton/SendMoneyButton';

function ContactActionButtons({ profile, className, addContact, deleteContact }) {
  const [isFriend, setIsFriend] = React.useState(false);
  const userContacts = useSelector(state => state.contactsReducer.userContacts);

  const buttonWrapperStyles = className
    ?
    cn(classes.buttonsWrapper, className)
    :
    classes.buttonsWrapper;

  React.useEffect(() => {
    let check = false;
    if (userContacts.length > 0) {
      for (let i of userContacts) {
        if (i === profile.user) {
          setIsFriend(true);
          check = true;
        }
      };
    };
    if (!check) {
      setIsFriend(false);
    }
  });

  return (
    <div className={buttonWrapperStyles}>
      {isFriend
        ?
        <>
          <SendMoneyButton profile={profile} />
          <Button
            type="primary"
            size="small"
            ghost
            danger
            onClick={deleteContact}
            disabled={profile.isLoading}
            className={cn(classes.button, classes.deleteBtn)}
          >
            {profile.isLoading ? <Spin size="small" className={classes.spin} /> : "Delete contact"}
          </Button>
        </>
        :
        <Button
          type="primary"
          size="middle"
          onClick={addContact}
          disabled={profile.isLoading}
          className={cn(classes.button, classes.addBtn)}
        >
          {profile.isLoading ? <Spin /> : "Add contact"}
        </Button>}
    </div>
  )
};

ContactActionButtons.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    user: PropTypes.string,
    created_at: PropTypes.string,
    isLoading: PropTypes.bool
  }),
  className: PropTypes.string,
  addContact: PropTypes.func,
  deleteContact: PropTypes.func
};

export default ContactActionButtons;
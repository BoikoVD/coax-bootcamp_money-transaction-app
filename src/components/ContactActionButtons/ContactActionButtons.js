import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Spin } from 'antd';
import { addContactAC, setContactsAC } from '../../store/actions/actions';
import { addContactRequest, deleteContactRequest } from '../../services/apiService';
import classes from './ContactActionButtons.module.scss';

function ContactActionButtons({ id }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFriend, setIsFriend] = React.useState(false);
  const user = useSelector(state => state.userReducer.userData);
  const userContacts = useSelector(state => state.contactsReducer.userContacts);
  const dispatch = useDispatch();

  React.useEffect(() => {
    let check = false;
    if (userContacts.length > 0) {
      for (let i of userContacts) {
        if (i === id) {
          setIsFriend(true);
          check = true;
        }
      };
    };
    if (!check) {
      setIsFriend(false);
    }
  }, [id, userContacts]);

  const addContactHandler = async () => {
    setIsLoading(true);
    try {
      const response = await addContactRequest(user.id, id);
      dispatch(addContactAC(response.data[0].contact));
    } catch (e) {
      console.log("ADD CONTACT ERROR: ", e.response.data);
    }
    setIsLoading(false);
  };

  const deleteContactHandler = async () => {
    setIsLoading(true);
    try {
      await deleteContactRequest(user.id, id);
      const newContacts = userContacts.filter((i) => i !== id);
      dispatch(setContactsAC(newContacts));
    } catch (e) {
      console.log("DELETE CONTACT ERROR: ", e.response.data);
    }
    setIsLoading(false);
  };

  return (
    <div className={classes.buttonsWrapper}>
      {isFriend
        ?
        <>
          <Button
            type="primary"
            size="middle"
            disabled={isLoading}
            className={classes.button}
          >
            Send money
          </Button>
          <Button
            type="primary"
            size="small"
            ghost
            danger
            onClick={deleteContactHandler}
            disabled={isLoading}
            className={cn(classes.button, classes.deleteBtn)}
          >
            {isLoading ? <Spin size="small" className={classes.spin} /> : "Delete contact"}
          </Button>
        </>
        :
        <Button
          type="primary"
          size="middle"
          onClick={addContactHandler}
          disabled={isLoading}
          className={cn(classes.button, classes.addBtn)}
        >
          {isLoading ? <Spin /> : "Add contact"}
        </Button>}
    </div>
  )
};

ContactActionButtons.propTypes = {
  id: PropTypes.string.isRequired
};

export default ContactActionButtons;
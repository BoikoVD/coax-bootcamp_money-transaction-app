import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Spin } from 'antd';
import { addContactAC } from '../../store/actions/actions';
import { addContactRequest } from '../../services/apiService';
import classes from './ContactActionButtons.module.scss';

function ContactActionButtons({ id }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFriend, setIsFriend] = React.useState(false);
  const user = useSelector(state => state.userReducer.userData);
  const userContacts = useSelector(state => state.contactsReducer.userContacts);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (userContacts.length > 0) {
      for (let i of userContacts) {
        if (i === id) {
          setIsFriend(true);
        }
      };
    };
  }, [id, userContacts]);

  const addContactHandler = async () => {
    setIsLoading(true);
    try {
      const response = await addContactRequest(user.id, id);
      console.log(response);
      dispatch(addContactAC(response.data[0].contact));
    } catch (e) {
      console.log("ADD CONTACT ERROR: ", e.response.data);
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
          onClick={addContactHandler}
          disabled={isLoading}
          className={cn(classes.button, classes.addContactBtn)}
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
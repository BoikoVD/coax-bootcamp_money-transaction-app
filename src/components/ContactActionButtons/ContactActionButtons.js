import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Spin } from 'antd';
import * as actions from '../../store/actions/actions';
import classes from './ContactActionButtons.module.scss';

function ContactActionButtons({ id, isLoading }) {
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

  const addContactHandler = () => {
    dispatch(actions.addContactAC(id));
  };

  const deleteContactHandler = () => {
    dispatch(actions.deleteContactAC(id));
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
  id: PropTypes.string,
  isLoading: PropTypes.bool
};

export default ContactActionButtons;
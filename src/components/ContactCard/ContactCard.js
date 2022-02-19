import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { format, parseJSON } from 'date-fns';
import { Row, Col } from 'antd';
import ContactActionButtons from '../ContactActionButtons/ContactActionButtons';
import * as actions from '../../store/actions/actions';
import AvatarIcon from '../../assets/icons/profile.svg';
import classes from './ContactCard.module.scss';

function ContactCard({ profile }) {
  const dispatch = useDispatch();

  const addContactHandler = () => {
    dispatch(actions.addContactAC(profile.user));
  };

  const deleteContactHandler = () => {
    dispatch(actions.deleteContactAC(profile.user));
  };

  return (
    <Row align="middle" className={classes.card}>
      <Col xs={{ span: 7 }} sm={{ span: 6 }} md={{ span: 6 }} lg={{ span: 5 }}>
        <div className={classes.avatar}>
          <img src={AvatarIcon} alt='Avatar' />
        </div>
      </Col>
      <Col xs={{ span: 17 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 13 }} className={classes.data}>
        <div className={classes.title}>
          <Link to={`/profile/${profile.user}`} className={classes.link}>
            {profile.firstName + " " + profile.lastName}
          </Link>
        </div>
        <div className={classes.info}>
          <p>Email: <span>{profile.email}</span></p>
        </div>
        <div className={classes.info}>
          <p>Registered: <span>{format(parseJSON(profile.created_at), "dd.MM.yyyy")}</span></p>
        </div>
      </Col>
      <Col xs={{ span: 24 }} sm={{ span: 6 }} md={{ span: 6 }} lg={{ span: 6 }}>
        <ContactActionButtons
          profile={profile}
          addContact={addContactHandler}
          deleteContact={deleteContactHandler}
        />
      </Col>
    </Row >
  )
};

ContactCard.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    user: PropTypes.string,
    created_at: PropTypes.string,
    isLoading: PropTypes.bool
  }).isRequired
}

export default ContactCard;
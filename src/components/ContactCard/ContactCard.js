import React from 'react';
import PropTypes from 'prop-types';
import { format, parseJSON } from 'date-fns';
import { Row, Col } from 'antd';
import ContactActionButtons from '../ContactActionButtons/ContactActionButtons';
import AvatarIcon from '../../assets/icons/profile.svg';
import classes from './ContactCard.module.scss';

function ContactCard({ profile }) {

  return (
    <Row align="middle" className={classes.card}>
      <Col xs={{ span: 7 }} sm={{ span: 6 }} md={{ span: 6 }} lg={{ span: 5 }}>
        <div className={classes.avatar}>
          <img src={AvatarIcon} alt='Avatar' />
        </div>
      </Col>
      <Col xs={{ span: 17 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 13 }} className={classes.data}>
        <div className={classes.title}>
          {profile.firstName + " " + profile.lastName}
        </div>
        <div className={classes.info}>
          Email: <span>{profile.email}</span>
        </div>
        <div className={classes.info}>
          Registered: <span>{format(parseJSON(profile.created_at), "dd.MM.yyyy")}</span>
        </div>
      </Col>
      <Col xs={{ span: 24 }} sm={{ span: 6 }} md={{ span: 6 }} lg={{ span: 6 }}>
        <ContactActionButtons id={profile.user} />
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
    created_at: PropTypes.string
  }).isRequired
}

export default ContactCard;
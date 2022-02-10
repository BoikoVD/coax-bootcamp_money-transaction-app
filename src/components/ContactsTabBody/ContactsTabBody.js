import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import ContactCard from '../../components/ContactCard/ContactCard';
import classes from './ContactsTabBody.module.scss';

function ContactsTabBody({ isLoading, profiles }) {

  const buildProfileCards = (arrayOfProfiles) => {
    if (arrayOfProfiles.length === 0) {
      return (
        <div className={classes.spinWrapper}>
          <div>No data</div>
        </div>
      )
    } else {
      return arrayOfProfiles.map((profile) => {
        return <ContactCard profile={profile} key={profile.id} />
      });
    }
  }

  return (
    isLoading
      ?
      <div className={classes.spinWrapper}>
        < Spin size="large" />
      </div >
      :
      <div className={classes.body}>
        {buildProfileCards(profiles)}
      </div>
  )
}

ContactsTabBody.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  profiles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    user: PropTypes.string,
    created_at: PropTypes.string
  })).isRequired
}

export default ContactsTabBody;
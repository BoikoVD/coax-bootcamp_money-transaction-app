import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Pagination } from 'antd';
import ContactCard from '../../components/ContactCard/ContactCard';
import classes from './ContactsTabBody.module.scss';

function ContactsTabBody({ isLoading, profiles, cardCount, paginationHandler, pagination }) {

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
    <div className={classes.content}>
      <div className={classes.bodyWrapper}>
        {
          isLoading
            ?
            <div className={classes.spinWrapper}>
              < Spin size="large" />
            </div >
            :
            <div className={classes.body}>
              {buildProfileCards(profiles)}
            </div>
        }
      </div>
      <div className={classes.paginationWrapper}>
        <Pagination
          current={pagination}
          total={cardCount}
          onChange={paginationHandler}
          hideOnSinglePage={true}
          showSizeChanger={false}
        />
      </div>
    </div >
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
  })).isRequired,
  cardCount: PropTypes.number.isRequired,
  paginationHandler: PropTypes.func.isRequired,
  pagination: PropTypes.number.isRequired,
}

export default ContactsTabBody;
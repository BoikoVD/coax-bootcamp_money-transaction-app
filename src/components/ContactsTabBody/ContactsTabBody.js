import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Spin, Pagination, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ContactCard from '../../components/ContactCard/ContactCard';
import classes from './ContactsTabBody.module.scss';

function ContactsTabBody({ paginationHandler, searchValue, setSearchValue }) {
  const contactsData = useSelector(state => state.contactsReducer);

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
      <div className={classes.search}>
        <Input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} prefix={<SearchOutlined />} />
      </div>
      <div className={classes.bodyWrapper}>
        {
          contactsData.isLoading
            ?
            <div className={classes.spinWrapper}>
              < Spin size="large" />
            </div >
            :
            <div className={classes.body}>
              {buildProfileCards(contactsData.profiles)}
            </div>
        }
      </div>
      <div className={classes.paginationWrapper}>
        <Pagination
          current={contactsData.activePagination}
          total={contactsData.itemsCount}
          onChange={paginationHandler}
          hideOnSinglePage={true}
          showSizeChanger={false}
        />
      </div>
    </div >
  )
}

ContactsTabBody.propTypes = {
  paginationHandler: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired
}

export default ContactsTabBody;
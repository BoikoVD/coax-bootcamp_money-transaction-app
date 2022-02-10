import React from 'react';
import { Tabs, Pagination } from 'antd';
import { getProfilesWithPaginationRequest } from '../../services/apiService';
import { pageCountHelper } from '../../helpers/helpers';
import ContactsTabBody from '../../components/ContactsTabBody/ContactsTabBody';
import classes from './Contacts.module.scss';
import './Contacts.css';

const { TabPane } = Tabs;

function Contacts() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [profiles, setProfiles] = React.useState([]);
  const [pageCount, setPageCount] = React.useState(1);

  const tabClickHandler = async (key) => {
    setIsLoading(true);
    setPageCount(1);
    if (key === "myContacts") {
      setProfiles([]);
      setIsLoading(false);
    };

    if (key === "allUsers") {
      try {
        const response = await getProfilesWithPaginationRequest(0, 9);
        setProfiles(response.data);
        const pages = pageCountHelper(response.headers["content-range"]);
        setPageCount(pages);
        setIsLoading(false);
      } catch (e) {
        console.log("TAB ALLUSERS ERROR", e);
        setIsLoading(false);
      }
    }
  };

  const paginationHandler = async (page) => {
    setIsLoading(true);
    try {
      const from = (page * 10) - 1 - 9;
      const to = (page * 10) - 1;
      const response = await getProfilesWithPaginationRequest(from, to);
      setProfiles(response.data);
      setIsLoading(false);
    } catch (e) {
      console.log("TAB PAGINATION ALLUSERS ERROR", e);
      setIsLoading(false);
    }
  };

  return (
    <div className="card-container">
      <Tabs type="card" onChange={tabClickHandler}>
        <TabPane tab="My contacts" key="myContacts" >
          <div className={classes.content}>
            <ContactsTabBody isLoading={isLoading} profiles={profiles} />
            <div className={classes.paginationWrapper}>
              <Pagination
                total={pageCount}
                onChange={paginationHandler}
                showSizeChanger={false}
              />
            </div>
          </div>
        </TabPane>
        <TabPane tab="All users" key="allUsers" >
          <div className={classes.content}>
            <ContactsTabBody isLoading={isLoading} profiles={profiles} />
            <div className={classes.paginationWrapper}>
              <Pagination
                total={pageCount}
                onChange={paginationHandler}
                showSizeChanger={false}
              />
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div >
  )
}

export default Contacts;
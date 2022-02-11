import React from 'react';
import { useSelector } from 'react-redux';
import { Tabs, Pagination } from 'antd';
import { getProfilesWithPaginationRequest, getContactProfilesRequest } from '../../services/apiService';
import { pageCountHelper } from '../../helpers/helpers';
import ContactsTabBody from '../../components/ContactsTabBody/ContactsTabBody';
import classes from './Contacts.module.scss';
import './Contacts.css';

const { TabPane } = Tabs;

function Contacts() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [profiles, setProfiles] = React.useState([]);
  const [pageCount, setPageCount] = React.useState(1);
  const userContacts = useSelector(state => state.contactsReducer.userContacts);

  const getContacts = async () => {
    try {
      setIsLoading(true);
      let contacts;
      if (userContacts.length > 10) {
        contacts = await getContactProfilesRequest(userContacts.slice(0, 10));
      } else {
        contacts = await getContactProfilesRequest(userContacts);
      }
      setProfiles(contacts.data);
      setPageCount(userContacts.length);
      setIsLoading(false);
    } catch (e) {
      console.log("GET CONTACTS ERROR", e);
      setIsLoading(false);
    }
  };
  const getAllUsers = async () => {
    try {
      setIsLoading(true);
      const response = await getProfilesWithPaginationRequest(0, 9);
      setProfiles(response.data);
      const pages = pageCountHelper(response.headers["content-range"]);
      setPageCount(pages);
      setIsLoading(false);
    } catch (e) {
      console.log("GET ALLUSERS ERROR", e);
      setIsLoading(false);
    }
  };

  const tabHandler = async (key) => {
    setPageCount(1);
    if (key === "myContacts") {
      getContacts();
    };
    if (key === "allUsers") {
      getAllUsers();
    };
  };

  const paginationAllUsersHandler = async (page) => {
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

  const paginationMyContactsHandler = async (page) => {
    const to = page * 10;
    const from = to - 10;
    const contacts = await getContactProfilesRequest(userContacts.slice(from, to));
    setProfiles(contacts.data);
  };

  React.useEffect(async () => {
    getContacts();
  }, []);

  return (
    <div className="card-container">
      <Tabs type="card" onChange={tabHandler}>
        <TabPane tab="My contacts" key="myContacts" >
          <div className={classes.content}>
            <ContactsTabBody isLoading={isLoading} profiles={profiles} />
            <div className={classes.paginationWrapper}>
              <Pagination
                total={pageCount}
                onChange={paginationMyContactsHandler}
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
                onChange={paginationAllUsersHandler}
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
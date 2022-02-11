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
  const [pagination, setPagination] = React.useState(1);
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
    setPagination(1);
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
      setPagination(page);
    } catch (e) {
      console.log("TAB PAGINATION ALLUSERS ERROR", e);
    }
    setIsLoading(false);
  };

  const paginationMyContactsHandler = async (page) => {
    setIsLoading(true);
    try {
      const to = page * 10;
      const from = to - 10;
      const contacts = await getContactProfilesRequest(userContacts.slice(from, to));
      setProfiles(contacts.data);
      setPagination(page);
    } catch (e) {
      console.log("TAB PAGINATION MYCONTACTS ERROR", e);
    }
    setIsLoading(false);
  };

  React.useEffect(async () => {
    getContacts();
  }, []);

  return (
    <div className="card-container">
      <Tabs type="card" onChange={tabHandler}>
        <TabPane tab="My contacts" key="myContacts" >
          <ContactsTabBody
            isLoading={isLoading}
            profiles={profiles}
            cardCount={pageCount}
            paginationHandler={paginationMyContactsHandler}
            pagination={pagination}
          />
        </TabPane>
        <TabPane tab="All users" key="allUsers" >
          <ContactsTabBody
            isLoading={isLoading}
            profiles={profiles}
            cardCount={pageCount}
            paginationHandler={paginationAllUsersHandler}
            pagination={pagination}
          />
        </TabPane>
      </Tabs>
    </div >
  )
}

export default Contacts;
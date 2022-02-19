import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, message } from 'antd';
import * as actions from '../../store/actions/actions';
import ContactsTabBody from '../../components/ContactsTabBody/ContactsTabBody';
import './Contacts.css';

const { TabPane } = Tabs;

function Contacts() {
  const [searchValue, setSearchValue] = React.useState('');
  const modal = useSelector(state => state.modalReducer);
  const dispatch = useDispatch();

  const tabHandler = (key) => {
    dispatch(actions.setItemsCountOfPaginationAC(1));

    if (key === "myContacts") {
      dispatch(actions.getProfilesForContactsAC(1, searchValue, "myContacts"));
    };
    if (key === "allUsers") {
      dispatch(actions.getProfilesForContactsAC(1, searchValue, "allUsers"));
    };
  };

  const searchContactsProfiles = (value) => {
    dispatch(actions.getProfilesForContactsAC(1, value, "myContacts"));
    setSearchValue(value);
  }
  const searchUserProfiles = (value) => {
    dispatch(actions.getProfilesForContactsAC(1, value, "allUsers"));
    setSearchValue(value);
  }

  const paginationMyContactsHandler = (page) => {
    dispatch(actions.getProfilesForContactsAC(page, searchValue, "myContacts"));
  };
  const paginationAllUsersHandler = (page) => {
    dispatch(actions.getProfilesForContactsAC(page, searchValue, "allUsers"));
  };

  React.useEffect(() => {
    dispatch(actions.getProfilesForContactsAC(1, searchValue, "myContacts"));
  }, []);

  React.useEffect(() => {
    if (modal.modalMessage) {
      if (modal.modalMessageType === "error") {
        message.error(modal.modalMessage, 5);
        dispatch(actions.removeModalMessageAC());
      }
      if (modal.modalMessageType === "success") {
        message.success(modal.modalMessage, 5);
        dispatch(actions.removeModalMessageAC());
      }
    }
  }, [modal.modalMessage]);

  return (
    <div className="card-container">
      <Tabs type="card" onChange={tabHandler}>
        <TabPane tab="My contacts" key="myContacts" >
          <ContactsTabBody
            searchValue={searchValue}
            setSearchValue={searchContactsProfiles}
            paginationHandler={paginationMyContactsHandler}
          />
        </TabPane>
        <TabPane tab="All users" key="allUsers" >
          <ContactsTabBody
            searchValue={searchValue}
            setSearchValue={searchUserProfiles}
            paginationHandler={paginationAllUsersHandler}
          />
        </TabPane>
      </Tabs>
    </div >
  )
}

export default Contacts;
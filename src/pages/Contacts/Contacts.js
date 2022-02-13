import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, message } from 'antd';
import * as actions from '../../store/actions/actions';
import ContactsTabBody from '../../components/ContactsTabBody/ContactsTabBody';
import './Contacts.css';

const { TabPane } = Tabs;

function Contacts() {
  const modal = useSelector(state => state.modalReducer);
  const dispatch = useDispatch();

  const tabHandler = (key) => {
    dispatch(actions.setPaginationAC(1));
    dispatch(actions.setItemsCountOfPaginationAC(1));

    if (key === "myContacts") {
      dispatch(actions.getContactsAC(0, 10, 1));
    };
    if (key === "allUsers") {
      dispatch(actions.getAllProfilesAC(0, 9, 1));
    };
  };

  const paginationAllUsersHandler = (page) => {
    const from = (page * 10) - 1 - 9;
    const to = (page * 10) - 1;
    dispatch(actions.getAllProfilesAC(from, to, page));
  };

  const paginationMyContactsHandler = (page) => {
    const to = page * 10;
    const from = to - 10;
    dispatch(actions.getContactsAC(from, to, page));
  };

  React.useEffect(() => {
    dispatch(actions.getContactsAC(0, 10));
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
            paginationHandler={paginationMyContactsHandler}
          />
        </TabPane>
        <TabPane tab="All users" key="allUsers" >
          <ContactsTabBody
            paginationHandler={paginationAllUsersHandler}
          />
        </TabPane>
      </Tabs>
    </div >
  )
}

export default Contacts;
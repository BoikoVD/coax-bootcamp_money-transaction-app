import React from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { format, toDate } from 'date-fns';
import { Link } from 'react-router-dom';
import { Col, Row, Table, message, Spin } from 'antd';
import * as actions from '../../store/actions/actions';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Container from '../../components/Container/Container';
import SmallContactCard from '../../components/SmallContactCard/SmallContactCard';
import classes from './Dashboard.module.scss';

function Dashboard() {
  const transactionsData = useSelector(state => state.transactionsReducer);
  const contactsData = useSelector(state => state.contactsReducer);
  const userData = useSelector(state => state.userReducer.userData);
  const modal = useSelector(state => state.modalReducer);
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  const transactions = transactionsData.transactions.slice(0, 5);

  const tableColumns = [
    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date) => (
        <>
          {format(toDate(date), "dd.MM.yyyy - HH:mm")}
        </>
      ),
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => {
        if (amount[0] === "+") {
          return (
            <span style={{ color: "green", fontWeight: "500" }}>
              {amount}
            </span>
          )
        } else {
          return (
            <span style={{ color: "red", fontWeight: "500" }}>
              {amount}
            </span>
          )
        }
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ];

  React.useEffect(() => {
    dispatch(actions.getProfilesForContactsAC(1, "", "myContacts"));
    dispatch(actions.getTransactionListAC(userData.id));
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
    <div className={classes.wrapper}>
      <Row gutter={[15, 15]} className={classes.content}>
        <Col
          xs={{ span: 24 }} sm={{ span: 8 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 5 }}
        >
          <Container className={classes.balanceContainer}>
            <div className={classes.title}>
              <div className={classes.balanceTitle}>Your balance</div>
            </div>
            <div className={classes.body}>
              <div className={classes.balance}>
                {transactionsData.balance + "$"}
              </div>
            </div>
          </Container>
        </Col>
        <Col
          xs={{ span: 24 }} sm={{ span: 16 }} md={{ span: 16 }} lg={{ span: 18 }} xl={{ span: 19 }}
        >
          <Container className={classes.transferContainer}>
            <div className={classes.title}>
              <div>Quick transfer</div><Link to="/contacts" className={classes.link}>View all</Link>
            </div>
            <div className={cn(classes.body, classes.transferBody)}>
              {contactsData.isLoading
                ?
                <div className={classes.spin}>
                  <Spin size="default" />
                </div>
                :
                contactsData.profiles.length === 0
                  ?
                  <div className={classes.spin}>
                    No data
                  </div>
                  :
                  contactsData.profiles.map((p) => {
                    return <SmallContactCard profile={p} key={p.id} />
                  })}
            </div>
          </Container>
        </Col>
        <Col
          xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}
        >
          <Container>
            <div className={classes.title}>
              <div>Recent transactions</div><Link to="/transactions" className={classes.link}>View all</Link>
            </div>
            <Table
              columns={tableColumns}
              dataSource={transactions}
              pagination={false}
              scroll={{ x: 700 }}
              tableLayout="fixed"
              className={classes.table}
              size={width < 575 ? "small" : width > 992 ? "large" : "middle"}
            />
          </Container>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard;
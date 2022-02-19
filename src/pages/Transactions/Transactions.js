import React from 'react';
import { useSelector } from 'react-redux';
import { format, toDate } from 'date-fns';
import { Table } from 'antd';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Container from '../../components/Container/Container';
import classes from './Transactions.module.scss';

function Transactions() {
  const transactionsData = useSelector(state => state.transactionsReducer);
  const { width } = useWindowDimensions();

  let arrayOfEmails = [];
  for (let t of transactionsData.transactions) {
    if (!arrayOfEmails.includes(t.email)) {
      arrayOfEmails.push(t.email);
    }
  }
  let arrayOfFirstNames = [];
  for (let t of transactionsData.transactions) {
    if (!arrayOfFirstNames.includes(t.firstName)) {
      arrayOfFirstNames.push(t.firstName);
    }
  }
  let arrayOfLastNames = [];
  for (let t of transactionsData.transactions) {
    if (!arrayOfLastNames.includes(t.lastName)) {
      arrayOfLastNames.push(t.lastName);
    }
  }

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
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.created_at - b.created_at,
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      filters: arrayOfFirstNames.map(n => { return { text: n, value: n } }),
      onFilter: (value, record) => record.firstName === value
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      filters: arrayOfLastNames.map(n => { return { text: n, value: n } }),
      onFilter: (value, record) => record.lastName === value
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
      filters: [
        {
          text: '+',
          value: '+',
        },
        {
          text: '-',
          value: '-',
        },
      ],
      onFilter: (value, record) => record.amount[0] === value,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      filters: arrayOfEmails.map(e => { return { text: e, value: e } }),
      onFilter: (value, record) => record.email === value
    },
  ];

  return (
    <Container className={classes.container}>
      <Table
        columns={tableColumns}
        dataSource={transactionsData.transactions}
        scroll={{ x: 700 }}
        tableLayout="fixed"
        size={width < 575 ? "small" : width > 992 ? "large" : "middle"}
      />
    </Container>
  )
}

export default Transactions;
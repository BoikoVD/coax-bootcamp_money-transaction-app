import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import classes from './ProfileTitle.module.scss';

function ProfileTitle({ isCurrent, firstName, lastName }) {

  return (
    <div className={classes.title}>
      {firstName + " " + lastName}
      {isCurrent ? <Button type="link" icon={<EditOutlined />} className={classes.editBtn} /> : null}
    </div>
  )
}

ProfileTitle.propTypes = {
  isCurrent: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
}

export default ProfileTitle;
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { format, parseJSON } from 'date-fns';
import { Spin, message, Row, Col } from 'antd';
import * as actions from '../../store/actions/actions';
import Container from '../../components/Container/Container';
import ProfileTitle from '../../components/ProfileTitle/ProfileTitle';
import ResetPasswordButton from '../../components/ResetPasswordButton/ResetPasswordButton';
import ContactActionButtons from '../../components/ContactActionButtons/ContactActionButtons';
import AvatarIcon from '../../assets/icons/profile.svg';
import classes from './Profile.module.scss';

function Profile() {
  const profile = useSelector(state => state.profileReducer);
  const transactionsData = useSelector(state => state.transactionsReducer);
  const modal = useSelector(state => state.modalReducer);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addContactHandler = () => {
    dispatch(actions.addThisUserToContactAC(profile.profileData.user));
  };

  const deleteContactHandler = () => {
    dispatch(actions.deleteThisUserFromContactsAC(profile.profileData.user));
  };

  React.useEffect(() => {
    dispatch(actions.getProfileAC(id));
  }, [id]);

  React.useEffect(() => {
    if (profile.error) {
      dispatch(actions.getProfileErrorAC(null));
      navigate("/not-found", { replace: true });
    }
  }, [profile.error]);

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
    profile.isLoading
      ?
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
      }}>
        <Spin size="large" />
      </div>
      :
      <Container className={classes.container}>
        <Row className={classes.wrapper}>
          <Col
            xs={{ span: 24 }} sm={{ span: 6 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 5 }}
            className={classes.avatarWrapper}
          >
            <div className={classes.avatar}>
              <img src={AvatarIcon} alt='Avatar' />
            </div>
          </Col>
          <Col
            xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 13 }}
            className={classes.infoWrapper}
          >
            <div className={classes.infoBlock}>
              <ProfileTitle
                isCurrent={profile.isCurrent}
                firstName={profile.profileData.firstName}
                lastName={profile.profileData.lastName}
                profileId={profile.profileData.id}
              />
              <div className={classes.info}>
                Email: <span>
                  {profile.profileData.email}
                </span>
              </div>
              <div className={classes.info}>
                Registered: <span>
                  {format(parseJSON(profile.profileData.created_at), "dd.MM.yyyy")}
                </span>
              </div>
              {profile.isCurrent
                ?
                <ResetPasswordButton />
                :
                <ContactActionButtons
                  profile={profile.profileData}
                  className={classes.actionButtons}
                  addContact={addContactHandler}
                  deleteContact={deleteContactHandler}
                />}
            </div>
          </Col>
          <Col
            xs={{ span: 24 }} sm={{ span: 6 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 6 }}
            className={classes.balanceWrapper}
          >
            {profile.isCurrent
              ?
              <>
                <div className={classes.balanceTitle}>Your balance</div>
                <div className={classes.balance}>{transactionsData.balance} $</div>
              </>
              : null}
          </Col>
        </Row>
      </Container>
  )
}

export default Profile;
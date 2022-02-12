import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { format, parseJSON } from 'date-fns';
import { Spin, message } from 'antd';
import * as actions from '../../store/actions/actions';
import Container from '../../components/Container/Container';
import ProfileTitle from '../../components/ProfileTitle/ProfileTitle';
import ResetPasswordButton from '../../components/ResetPasswordButton/ResetPasswordButton';
import ContactActionButtons from '../../components/ContactActionButtons/ContactActionButtons';
import AvatarIcon from '../../assets/icons/profile.svg';
import classes from './Profile.module.scss';

function Profile() {
  const profile = useSelector(state => state.profileReducer);
  const modal = useSelector(state => state.modalReducer);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.getProfileAC(id));
  }, [id]);

  React.useEffect(() => {
    if (profile.error) {
      dispatch(actions.setErrorProfileAC(null));
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
      <div>
        <Container className={classes.container}>
          <div className={classes.column}>
            <div className={classes.avatar}>
              <img src={AvatarIcon} alt='Avatar' />
            </div>
          </div>
          <div className={classes.column}>
            <ProfileTitle
              isCurrent={profile.isCurrent}
              firstName={profile.profileData.firstName}
              lastName={profile.profileData.lastName}
              profileId={profile.profileData.id}
            />
            <div className={classes.info}>
              <span>Email: </span>
              {profile.profileData.email}
            </div>
            <div className={classes.info}>
              <span>Registered: </span>
              {format(parseJSON(profile.profileData.created_at), "dd.MM.yyyy")}
            </div>
            {profile.isCurrent
              ?
              <ResetPasswordButton />
              :
              <ContactActionButtons profile={profile} />}
          </div>
        </Container>
      </div>
  )
}

export default Profile;
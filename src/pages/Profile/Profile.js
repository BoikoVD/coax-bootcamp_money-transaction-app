import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { format, parseJSON } from 'date-fns';
import { Spin } from 'antd';
import { getProfileRequest } from '../../http/api';
import { setProfileDataAC } from '../../store/actions/actions';
import Container from '../../components/Container/Container';
import ProfileTitle from '../../components/ProfileTitle/ProfileTitle';
import ProfileActionButtons from '../../components/ProfileActionButtons/ProfileActionButtons';
import classes from './Profile.module.scss';
import AvatarIcon from '../../assets/icons/profile.svg';
import Cookies from 'js-cookie';

function Profile() {
  const [isLoading, setIsLoading] = React.useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userReducer.userData);
  const profileData = useSelector(state => state.profileReducer.profileData);
  const isCurrent = useSelector(state => state.profileReducer.isCurrent);

  React.useEffect(async () => {
    try {
      setIsLoading(true);
      let currentProfile;
      if (id) {
        currentProfile = await getProfileRequest(id, Cookies.get('accessToken'), "id");
        dispatch(setProfileDataAC(currentProfile.data[0], false));
        setIsLoading(false);
      } else {
        currentProfile = await getProfileRequest(userData.id, Cookies.get('accessToken'), "user");
        console.log(currentProfile);
        dispatch(setProfileDataAC(currentProfile.data[0], true));
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      navigate("/not-found");
      console.log("PROFILE PAGE ERROR: ", e);
    }
  }, [id]);

  return (
    isLoading
      ?
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
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
              isCurrent={isCurrent}
              firstName={profileData.firstName}
              lastName={profileData.lastName}
              profileId={profileData.id}
            />
            <div className={classes.info}>
              <span>Email: </span>{profileData.email}
            </div>
            <div className={classes.info}>
              <span>Registered: </span>{format(parseJSON(profileData.created_at), "dd.MM.yyyy")}
            </div>
            <ProfileActionButtons isCurrent={isCurrent} id={id} />
          </div>
        </Container>
      </div>
  )
}

export default Profile;
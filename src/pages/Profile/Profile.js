import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { format, parseJSON } from 'date-fns';
import { Spin } from 'antd';
import { getAllProfilesRequest } from '../../http/api';
import { setCurrentProfileDataAC } from '../../store/actions/actions';
import Container from '../../components/Container/Container';
import ProfileTitle from '../../components/ProfileTitle/ProfileTitle';
import ProfileActionButtons from '../../components/ProfileActionButtons/ProfileActionButtons';
import classes from './Profile.module.scss';
import AvatarIcon from '../../assets/icons/profile.svg';

function Profile() {
  const [isLoading, setIsLoading] = React.useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentProfile = useSelector(state => state.userReducer.currentProfile);
  const profileData = useSelector(state => state.profilePageReducer.profileData);
  const isCurrent = useSelector(state => state.profilePageReducer.isCurrent);

  React.useEffect(async () => {
    try {
      setIsLoading(true);
      const usersData = await getAllProfilesRequest();
      if (id) {
        let check = false;
        for (let i of usersData.data) {
          if (i.id === id) {
            dispatch(setCurrentProfileDataAC(i, false));
            check = true;
          }
        }
        if (!check) {
          throw new Error("Profile not found");
        }
      } else {
        dispatch(setCurrentProfileDataAC(currentProfile, true));
      }
      setIsLoading(false);
    } catch (e) {
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
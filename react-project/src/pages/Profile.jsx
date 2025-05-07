import React, { useEffect } from 'react';
import SideBar from '../components/SideBar';
import Display from '../components/Display';
import styled from 'styled-components';
import useUserStore from '../store/userStore';
import { useLocation } from 'react-router-dom';
import ProfileMenu from '../components/ProfileMenu';

const Profile = () => {
  const user = useUserStore((state) => state.user);
  const location = useLocation();

  useEffect(() => {
    return () => {
      if (location.state?.refresh) {
        window.history.replaceState({}, document.title);
      }
    };
  }, [location.state]);

  return (
    <Wrapper>
      <FixedSideBar>
        <SideBar user={user} />
      </FixedSideBar>
      <Content>
        <ProfileMenu user={user} />
      </Content>
    </Wrapper>
  );
};

export default Profile;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: flex-start;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
`;

const FixedSideBar = styled.div`
  position: fixed;
  width: 250px;
  height: 100vh;
  background-color: white;
  z-index: 100;
`;

const Content = styled.div`
  margin-left: 250px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

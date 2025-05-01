import React from 'react';
import SideBar from '../components/SideBar';
import Display from '../components/Display';
import styled from 'styled-components';

const Home = () => {
  return (
    <Wrapper>
      <FixedSideBar>
        <SideBar />
      </FixedSideBar>
      <Content>
        <Display />
      </Content>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  display: flex;
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
`;

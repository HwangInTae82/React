import React from 'react';
import SideBar from '../components/SideBar';
import Display from '../components/Display';
import styled from 'styled-components';

const Home = () => {
  return (
    <Wrapper>
      <SideBar />
      <Display />
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  display: flex;
`;

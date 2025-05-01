import React from 'react';
import styled from 'styled-components';
import { MdHomeFilled, MdMenu } from 'react-icons/md';
import { IoIosSearch } from 'react-icons/io';
import { AiOutlineCompass } from 'react-icons/ai';
import { BiMoviePlay } from 'react-icons/bi';
import { HiOutlinePaperAirplane } from 'react-icons/hi';
import { FaRegHeart } from 'react-icons/fa';
import { FaRegSquarePlus } from 'react-icons/fa6';
import { BsThreads } from 'react-icons/bs';

const SideBar = () => {
  return (
    <Wrapper>
      <Logo>
        <Img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png" />
      </Logo>
      <MenuBar>
        <Menus>
          <MdHomeFilled size={24} />
          <MenusText>
            <span>홈</span>
          </MenusText>
        </Menus>
        <Menus>
          <IoIosSearch size={24} />
          <MenusText>
            <span>검색</span>
          </MenusText>
        </Menus>
        <Menus>
          <AiOutlineCompass size={24} />
          <MenusText>
            <span>탐색 탭</span>
          </MenusText>
        </Menus>
        <Menus>
          <BiMoviePlay size={24} />
          <MenusText>
            <span>릴스</span>
          </MenusText>
        </Menus>
        <Menus>
          <HiOutlinePaperAirplane size={24} />
          <MenusText>
            <span>메시지</span>
          </MenusText>
        </Menus>
        <Menus>
          <FaRegHeart size={24} />
          <MenusText>
            <span>알림</span>
          </MenusText>
        </Menus>
        <Menus>
          <FaRegSquarePlus size={24} />
          <MenusText>
            <span>만들기</span>
          </MenusText>
        </Menus>
        <Menus>
          <ProfileImg src="https://pbs.twimg.com/media/GovEjGWaUAA5uBV?format=jpg&name=large" />
          <MenusText>
            <span>프로필</span>
          </MenusText>
        </Menus>
      </MenuBar>
      <Menus>
        <BsThreads size={24} />
        <MenusText>
          <span>Threads</span>
        </MenusText>
      </Menus>
      <Menus>
        <MdMenu size={24} />
        <MenusText>
          <span>더 보기</span>
        </MenusText>
      </Menus>
    </Wrapper>
  );
};

export default SideBar;

const Wrapper = styled.div`
  display: flex;
  width: 250px;
  height: 100vh;
  flex-direction: column;
  border-right: 1px solid #eeeeee;
  padding-left: 16px;
`;

const Img = styled.img`
  width: 103px;
  height: 40px;
`;

const Logo = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 220px;
  height: 73px;
  padding: 20px 12px 11px;
  margin: 0 0 19px;
`;

const MenuBar = styled.div`
  width: 220px;
  height: 80%;
`;

const Menus = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 220px;
  height: 48px;
  padding: 12px;
  margin: 4px 0px;
`;

const MenusText = styled.div`
  width: fit-content;
  height: 24px;
  font-weight: 550;
  padding: 0 0 0 16px;
`;

const ProfileImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
`;

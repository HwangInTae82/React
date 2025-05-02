import React, { useState } from 'react';
import styled from 'styled-components';
import { MdHomeFilled, MdMenu, MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { IoIosSearch } from 'react-icons/io';
import { AiOutlineCompass } from 'react-icons/ai';
import { BiMoviePlay } from 'react-icons/bi';
import { HiOutlinePaperAirplane } from 'react-icons/hi';
import { FaRegHeart } from 'react-icons/fa';
import { FaRegSquarePlus } from 'react-icons/fa6';
import { BsThreads } from 'react-icons/bs';
import { IoLogOutOutline } from 'react-icons/io5';
import useUserStore from '../store/userStore';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleNavigation = (path) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path);
      setLoading(false); // 필요 시 제거
    }, 500); // 로딩 효과 지속 시간
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    clearUser();
    navigate('/');
    alert('로그아웃되었습니다.');
    setIsMenuOpen(false);
  };

  return (
    <Wrapper darkMode={isDarkMode}>
      <Logo>
        <Img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png" />
      </Logo>
      <MenuBar>
        <Menus darkMode={isDarkMode} onClick={() => handleNavigation('/home')}>
          <MdHomeFilled size={24} />
          <MenusText>
            <span>홈</span>
          </MenusText>
          {loading && <Spinner />}
        </Menus>
        <Menus darkMode={isDarkMode}>
          <IoIosSearch size={24} />
          <MenusText>
            <span>검색</span>
          </MenusText>
        </Menus>
        <Menus darkMode={isDarkMode}>
          <AiOutlineCompass size={24} />
          <MenusText>
            <span>탐색 탭</span>
          </MenusText>
        </Menus>
        <Menus darkMode={isDarkMode}>
          <BiMoviePlay size={24} />
          <MenusText>
            <span>릴스</span>
          </MenusText>
        </Menus>
        <Menus darkMode={isDarkMode}>
          <HiOutlinePaperAirplane size={24} />
          <MenusText>
            <span>메시지</span>
          </MenusText>
        </Menus>
        <Menus darkMode={isDarkMode}>
          <FaRegHeart size={24} />
          <MenusText>
            <span>알림</span>
          </MenusText>
        </Menus>
        <Menus darkMode={isDarkMode}>
          <FaRegSquarePlus size={24} />
          <MenusText>
            <span>만들기</span>
          </MenusText>
        </Menus>
        <Menus darkMode={isDarkMode}>
          <ProfileImg src={user.img} />
          <MenusText>
            <span>프로필</span>
          </MenusText>
        </Menus>
      </MenuBar>
      <Menus darkMode={isDarkMode}>
        <BsThreads size={24} />
        <MenusText>
          <span>Threads</span>
        </MenusText>
      </Menus>
      <Menus darkMode={isDarkMode} onClick={toggleMenu}>
        <MdMenu size={24} />
        <MenusText>
          <span>더 보기</span>
        </MenusText>
      </Menus>

      {isMenuOpen && (
        <DropupMenu darkMode={isDarkMode}>
          <MenuItem darkMode={isDarkMode} onClick={toggleDarkMode}>
            {isDarkMode ? (
              <>
                <MdOutlineLightMode size={24} />
                <MenuItemText>라이트 모드로 전환</MenuItemText>
              </>
            ) : (
              <>
                <MdOutlineDarkMode size={24} />
                <MenuItemText>다크 모드로 전환</MenuItemText>
              </>
            )}
          </MenuItem>
          <Divider />
          <MenuItem darkMode={isDarkMode} onClick={handleLogout}>
            <IoLogOutOutline size={24} />
            <MenuItemText>로그아웃</MenuItemText>
          </MenuItem>
        </DropupMenu>
      )}
    </Wrapper>
  );
};

export default SideBar;

const Wrapper = styled.div`
  display: flex;
  width: 250px;
  height: 100vh;
  flex-direction: column;
  border-right: 1px solid ${(props) => (props.darkMode ? '#333333' : '#eeeeee')};
  padding-left: 16px;
  background-color: ${(props) => (props.darkMode ? '#121212' : '#ffffff')};
  color: ${(props) => (props.darkMode ? '#ffffff' : '#000000')};
  position: relative;
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
  border-radius: 12px;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.darkMode ? '#333333' : '#eeeeee')};
  }
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

const DropupMenu = styled.div`
  position: absolute;
  bottom: 60px;
  left: 12px;
  width: 220px;
  background-color: ${(props) => (props.darkMode ? '#1e1e1e' : '#ffffff')};
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  overflow: hidden;
  border: 1px solid ${(props) => (props.darkMode ? '#333333' : '#eeeeee')};
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => (props.darkMode ? '#333333' : '#f5f5f5')};
  }
`;

const MenuItemText = styled.span`
  margin-left: 16px;
  font-weight: 500;
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: #eeeeee;
`;

const Spinner = styled.div`
  margin-top: 10px;
  width: 24px;
  height: 24px;
  border: 3px solid #ccc;
  border-top: 3px solid #0064e0;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

import React, { useState } from 'react';
import styled from 'styled-components';
import { MdHomeFilled, MdMenu, MdOutlineDarkMode, MdOutlineLightMode, MdClose } from 'react-icons/md';
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
import axios from 'axios';
import { LiaSmileSolid } from 'react-icons/lia';
import { BeatLoader } from 'react-spinners';

const SideBar = ({ user }) => {
  const clearUser = useUserStore((state) => state.clearUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [img, setImg] = useState('');
  const [text, setText] = useState('');

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleNavigation = (path) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path);
      setLoading(false);
    }, 1000);
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

  const toggleCreateModal = () => {
    if (showCreateModal && (img || text)) {
      setImg('');
      setText('');
    }
    setShowCreateModal(!showCreateModal);
  };

  const toggleSubmit = async (e) => {
    if (!img || !text) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    e.preventDefault();

    const posts = {
      img: img,
      text: text,
      userImg: user.img,
      userNickName: user.userNickName,
      createdTime: new Date().toISOString(),
      status: true,
    };

    try {
      await axios.post('http://localhost:3001/posts', posts);
      alert('게시글 작성 성공!');

      toggleCreateModal();

      navigate('/home', { state: { refresh: true } });
    } catch (error) {
      console.error('게시글 작성 실패', error);
      alert('게시글 작성에 실패했습니다.');
    }
  };

  return (
    <Wrapper darkMode={isDarkMode}>
      <Logo>
        <Img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"
          onClick={() => handleNavigation('/home')}
        />
      </Logo>
      <MenuBar>
        <Menus darkMode={isDarkMode} onClick={() => handleNavigation('/home')}>
          <MdHomeFilled size={24} />
          <MenusText>
            <span>홈</span>
          </MenusText>
        </Menus>
        {loading && (
          <Overlay>
            <BeatLoader color="#000000" />
          </Overlay>
        )}
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
        <Menus darkMode={isDarkMode} onClick={toggleCreateModal}>
          <FaRegSquarePlus size={24} />
          <MenusText>
            <span>만들기</span>
          </MenusText>
        </Menus>
        <Menus darkMode={isDarkMode} onClick={() => navigate(`/user`)}>
          <ProfileImg src={user.img} />
          <MenusText>
            <span>프로필</span>
          </MenusText>
        </Menus>
      </MenuBar>
      <OptionBar>
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
      </OptionBar>

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

      {showCreateModal && (
        <ModalOverlay>
          <CreateModal darkMode={isDarkMode}>
            <ModalHeader>
              <CloseButton onClick={toggleCreateModal}>
                <MdClose size={24} />
              </CloseButton>
              <ModalTitle>새 게시물 만들기</ModalTitle>
              <ShareButton onClick={toggleSubmit}>공유하기</ShareButton>
            </ModalHeader>
            <Divider />
            <ModalContent>
              <MediaIconContainer>
                {!img && <MediaText>사진의 이미지 링크를 입력하세요</MediaText>}
                <ImgLinkText
                  type="text"
                  value={img}
                  placeholder="이미지 링크 삽입"
                  onChange={(e) => setImg(e.target.value)}
                />
                <PreviewImg>
                  {' '}
                  {img && (
                    <img src={img} alt="preview" style={{ width: '800px', height: '800px', objectFit: 'contain' }} />
                  )}
                </PreviewImg>
              </MediaIconContainer>
              <AddDataView>
                <WriterProfile>
                  <ProfileImg2 src={user.img} />
                  <div>{user.userNickName}</div>
                </WriterProfile>
                <TextArea type="text" value={text} placeholder="설명..." onChange={(e) => setText(e.target.value)} />
                <div style={{ borderBottom: '1px solid #b8b8b8', display: 'flex', paddingBottom: 10 }}>
                  <LiaSmileSolid size={24} />
                </div>
              </AddDataView>
            </ModalContent>
          </CreateModal>
        </ModalOverlay>
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
  height: 5%;
  padding: 20px 12px 11px;
  margin: 0 0 19px;
  cursor: pointer;
`;

const MenuBar = styled.div`
  flex: 1;
  width: 220px;
  overflow-y: auto;
`;

const OptionBar = styled.div`
  width: 220px;
  padding-bottom: 20px;
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

const ProfileImg2 = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
`;
const DropupMenu = styled.div`
  position: absolute;
  bottom: 75px;
  left: 16px;
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const CreateModal = styled.div`
  width: 1195px;
  height: 898px;
  background-color: ${(props) => (props.darkMode ? '#262626' : '#ffffff')};
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 12px 0;
  height: 42px;
`;

const ModalTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  left: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  display: flex;
  align-items: flex-start;
`;

const MediaIconContainer = styled.div`
  width: 798px;
  height: 855px;
  padding-top: 8px;
  border-right: 1px solid #eeeeee;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
`;
const MediaText = styled.p`
  font-size: 20px;
  text-align: center;
`;

const ShareButton = styled.div`
  position: absolute;
  right: 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  color: #0095f6;

  &:hover {
    color: #1c1c1c;
  }
`;

const PreviewImg = styled.div`
  position: relative;
  left: 0;
  bottom: 0;
  overflow: hidden;
`;

const AddDataView = styled.div`
  display: flex;
  width: 396px;
  padding: 0 16px;
  flex-direction: column;
  gap: 10px;
`;
const WriterProfile = styled.div`
  height: 60px;
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  align-items: center;
`;

const ImgLinkText = styled.input`
  width: 600px;
  padding: 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  border: none;
  padding: 10px;
  font-size: 16px;
  outline: none;
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white; /* 반투명 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* 최상위 레벨 */
`;

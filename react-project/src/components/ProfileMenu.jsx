import React, { useState, useEffect } from 'react';
import { CiSettings } from 'react-icons/ci';
import styled from 'styled-components';
import axios from 'axios';

const ProfileMenu = ({ user, posts, onUpdateUser }) => {
  const [postCount, setPostCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.user_name || '');
  const [editedNickname, setEditedNickname] = useState(user?.user_nickname || '');
  const [editedImg, setEditedImg] = useState(user?.user_img || '');
  const [showImageModal, setShowImageModal] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
      setEditedName(user.user_name || '');
      setEditedNickname(user.user_nickname || '');
      setEditedImg(user.user_img || '');
      setImagePreview(user.user_img || '');
    }
  }, [user]);

  useEffect(() => {
    if (currentUser && posts) {
      // 게시물 필터링 - user_email로 비교
      const userPosts = posts.filter((post) => post.user_email === currentUser.user_email);
      setPostCount(userPosts.length);
    }
  }, [currentUser, posts]);

  if (!currentUser) return null;

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);

    if (isEditing) {
      setEditedName(currentUser.user_name || '');
      setEditedNickname(currentUser.user_nickname || '');
      setEditedImg(currentUser.user_img || '');
      setImagePreview(currentUser.user_img || '');
    }
  };

  const handleImageClick = () => {
    if (!isEditing) return;
    setTempImageUrl(editedImg);
    setShowImageModal(true);
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setTempImageUrl(url);

    // 실시간 미리보기 업데이트
    if (url) {
      const img = new Image();
      img.onload = () => setImagePreview(url);
      img.onerror = () => setImagePreview('');
      img.src = url;
    } else {
      setImagePreview('');
    }
  };

  const handleImageSave = () => {
    setEditedImg(tempImageUrl);
    setImagePreview(tempImageUrl);
    setShowImageModal(false);
  };

  const handleImageCancel = () => {
    setTempImageUrl(editedImg);
    setImagePreview(editedImg);
    setShowImageModal(false);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);

      const updateData = {
        user_email: currentUser.user_email,
        user_name: editedName,
        user_nickname: editedNickname,
        user_img: editedImg,
      };

      // Spring Boot 백엔드 API 호출 (PUT 요청)
      const response = await axios.patch(`http://localhost:8585/api/members/${currentUser.user_email}`, updateData);

      const updatedUserData = response.data || { ...currentUser, ...updateData };

      // 즉시 로컬 상태 업데이트
      setCurrentUser(updatedUserData);

      // 상위 컴포넌트에 업데이트된 사용자 정보 전달
      if (onUpdateUser) {
        onUpdateUser(updatedUserData);
      }

      // localStorage 또는 sessionStorage에 저장된 사용자 정보도 업데이트
      // (만약 사용 중이라면)
      try {
        const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          const newUserData = { ...parsedUser, ...updatedUserData };

          if (localStorage.getItem('user')) {
            localStorage.setItem('user', JSON.stringify(newUserData));
          }
          if (sessionStorage.getItem('user')) {
            sessionStorage.setItem('user', JSON.stringify(newUserData));
          }
        }
      } catch (storageError) {
        console.warn('Storage update failed:', storageError);
      }

      alert('프로필이 성공적으로 업데이트되었습니다.');
      setIsEditing(false);
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
      alert('프로필 업데이트에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedName(currentUser.user_name || '');
    setEditedNickname(currentUser.user_nickname || '');
    setEditedImg(currentUser.user_img || '');
    setImagePreview(currentUser.user_img || '');
    setIsEditing(false);
  };

  return (
    <ProfileContainer>
      <ProfileWrapper onClick={(e) => e.stopPropagation()}>
        <ProfileContent>
          <ProfileInfo>
            <ProfileImageContainer>
              <ProfileImage
                src={isEditing ? imagePreview || editedImg : currentUser.user_img}
                alt="프로필 이미지"
                onClick={handleImageClick}
                $isEditing={isEditing}
              />
              {isEditing && (
                <ImageEditOverlay onClick={handleImageClick}>
                  <ImageEditText>이미지 변경</ImageEditText>
                </ImageEditOverlay>
              )}
            </ProfileImageContainer>

            <InfoContainer>
              {isEditing ? (
                <>
                  <Nickname>@{currentUser.user_nickname}</Nickname>
                </>
              ) : (
                <>
                  <Nickname>@{currentUser.user_nickname}</Nickname>
                  <EditButton onClick={handleEditToggle}>프로필 편집</EditButton>
                </>
              )}
            </InfoContainer>
            <SettingsButton>
              <CiSettings size={24} />
            </SettingsButton>
          </ProfileInfo>

          <StatsSection>
            <StatItem>
              <StatValue>{postCount}</StatValue>
              <StatLabel>게시물</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{currentUser.followers?.length || 0}</StatValue>
              <StatLabel>팔로워</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{currentUser.following?.length || 0}</StatValue>
              <StatLabel>팔로잉</StatLabel>
            </StatItem>
          </StatsSection>

          <BioSection>
            {isEditing ? (
              <InputGroup>
                <InputLabel>사용자 이름</InputLabel>
                <Input
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  placeholder="사용자 이름을 입력하세요"
                />
                <InputLabel>닉네임</InputLabel>
                <Input
                  value={editedNickname}
                  onChange={(e) => setEditedNickname(e.target.value)}
                  placeholder="닉네임을 입력하세요"
                />
                <ButtonGroup>
                  <SaveButton onClick={handleSave} disabled={isLoading}>
                    {isLoading ? '저장 중...' : '저장'}
                  </SaveButton>
                  <CancelButton onClick={handleCancel} disabled={isLoading}>
                    취소
                  </CancelButton>
                </ButtonGroup>
              </InputGroup>
            ) : (
              <>
                <BioText>
                  <strong>{currentUser.user_name}</strong>
                </BioText>
              </>
            )}
          </BioSection>
        </ProfileContent>
      </ProfileWrapper>

      {/* 이미지 URL 입력 모달 */}
      {showImageModal && (
        <ImageModal>
          <ImageModalContent>
            <ImageModalHeader>
              <h3>프로필 이미지 변경</h3>
              <CloseButton onClick={handleImageCancel}>×</CloseButton>
            </ImageModalHeader>

            <ImageModalBody>
              <InputLabel>이미지 URL을 입력하세요</InputLabel>
              <Input
                type="url"
                value={tempImageUrl}
                onChange={handleImageUrlChange}
                placeholder="https://example.com/image.jpg"
                autoFocus
              />

              {imagePreview && (
                <ImagePreviewContainer>
                  <ImagePreviewLabel>미리보기:</ImagePreviewLabel>
                  <ImagePreview src={imagePreview} alt="이미지 미리보기" />
                </ImagePreviewContainer>
              )}
            </ImageModalBody>

            <ImageModalFooter>
              <CancelButton onClick={handleImageCancel}>취소</CancelButton>
              <SaveButton onClick={handleImageSave} disabled={!tempImageUrl.trim()}>
                적용
              </SaveButton>
            </ImageModalFooter>
          </ImageModalContent>
          <ImageModalBackdrop onClick={handleImageCancel} />
        </ImageModal>
      )}
    </ProfileContainer>
  );
};

export default ProfileMenu;

// Styled Components는 동일하게 유지
const ProfileContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const ProfileWrapper = styled.div`
  width: 100%;
  max-width: 935px;
  margin: 0 auto;
`;

const ProfileContent = styled.div`
  width: 100%;
  padding: 20px 0;
`;

const ProfileInfo = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const ProfileImageContainer = styled.div`
  position: relative;
  margin-right: 30px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  cursor: ${(props) => (props.$isEditing ? 'pointer' : 'default')};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: ${(props) => (props.$isEditing ? '0.8' : '1')};
  }
`;

const ImageEditOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;

const ImageEditText = styled.span`
  color: white;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
`;

const ImageModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ImageModalBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ImageModalContent = styled.div`
  position: relative;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow: hidden;
  z-index: 1001;
`;

const ImageModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e1e5e9;

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #8e8e8e;
  padding: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const ImageModalBody = styled.div`
  padding: 20px;
`;

const ImagePreviewContainer = styled.div`
  margin-top: 20px;
`;

const ImagePreviewLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #262626;
  margin-bottom: 10px;
`;

const ImagePreview = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e1e5e9;
`;

const ImageModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 20px;
  border-top: 1px solid #e1e5e9;
  background-color: #fafafa;
`;

const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Nickname = styled.div`
  font-size: 28px;
  font-weight: 300;
`;

const SettingsButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const StatsSection = styled.div`
  display: flex;
  margin: 20px 0;
  margin-left: 180px;
  gap: 40px;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StatValue = styled.span`
  font-weight: 600;
`;

const StatLabel = styled.span`
  color: #262626;
`;

const BioSection = styled.div`
  margin-top: 10px;
  margin-left: 180px;
  width: calc(100% - 180px);
`;

const BioText = styled.div`
  font-size: 16px;
  margin-bottom: 5px;
  display: flex;
`;

const EditButton = styled.button`
  width: 100px;
  height: 32px;
  background-color: #efefef;
  border: none;
  border-radius: 4px;
  padding: 5px 9px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #dbdbdb;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;

const InputLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #262626;
  margin-bottom: -5px;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const SaveButton = styled.button`
  width: 100px;
  height: 32px;
  background-color: #4cb5f9;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 9px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;

  &:disabled {
    background-color: #a6d7fa;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #379be0;
  }
`;

const CancelButton = styled.button`
  width: 100px;
  height: 32px;
  background-color: #efefef;
  border: none;
  border-radius: 4px;
  padding: 5px 9px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;

  &:disabled {
    background-color: #f5f5f5;
    color: #a8a8a8;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #dbdbdb;
  }
`;

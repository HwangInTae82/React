import React, { useState, useEffect } from 'react';
import { CiSettings } from 'react-icons/ci';
import styled from 'styled-components';
import axios from 'axios';

const ProfileMenu = ({ user, posts, onUpdateUser }) => {
  const [postCount, setPostCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedNick, setEditedNick] = useState(user?.userNickName || '');
  const [editedUsername, setEditedUsername] = useState(user?.username || '');
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
      setEditedNick(user.userNickName || '');
      setEditedUsername(user.username || '');
    }
  }, [user]);

  useEffect(() => {
    if (currentUser && posts) {
      const userPosts = posts.filter((post) => post.userNickName === currentUser.userNickName);
      setPostCount(userPosts.length);
    }
  }, [currentUser, posts]);

  if (!currentUser) return null;

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);

    if (isEditing) {
      setEditedNick(currentUser.userNickName || '');
      setEditedUsername(currentUser.username || '');
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);

      const updatedUser = {
        ...currentUser,
        userNickName: editedNick,
        username: editedUsername,
      };

      const response = await axios.put(`http://localhost:3001/users/${currentUser.id}`, updatedUser);

      const updatedUserData = response.data || updatedUser;
      setCurrentUser(updatedUserData);

      if (onUpdateUser) {
        onUpdateUser(updatedUserData);
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
    setEditedNick(currentUser.userNickName || '');
    setEditedUsername(currentUser.username || '');
    setIsEditing(false);
  };

  return (
    <ProfileContainer>
      <ProfileWrapper onClick={(e) => e.stopPropagation()}>
        <ProfileContent>
          <ProfileInfo>
            <ProfileImage src={currentUser.img} alt="프로필 이미지" />
            <InfoContainer>
              {isEditing ? (
                <>
                  <Nickname>@{currentUser.userNickName}</Nickname>
                </>
              ) : (
                <>
                  <Nickname>@{currentUser.userNickName}</Nickname>
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
                  value={editedUsername}
                  onChange={(e) => setEditedUsername(e.target.value)}
                  placeholder="사용자 이름을 입력하세요"
                />
                <InputLabel>닉네임</InputLabel>
                <Input
                  value={editedNick}
                  onChange={(e) => setEditedNick(e.target.value)}
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
                  <strong>{currentUser.username}</strong>
                </BioText>
              </>
            )}
          </BioSection>
        </ProfileContent>
      </ProfileWrapper>
    </ProfileContainer>
  );
};

export default ProfileMenu;

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

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 30px;
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

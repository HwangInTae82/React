import React, { useState, useEffect } from 'react';
import { CiSettings } from 'react-icons/ci';
import styled from 'styled-components';

const ProfileMenu = ({ user, posts }) => {
  const [postCount, setPostCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedNick, setEditedNick] = useState(user?.userNickName || '');
  const [editedUsername, setEditedUsername] = useState(user?.username || '');

  useEffect(() => {
    if (user && posts) {
      const userPosts = posts.filter((post) => post.userNickName === user.userNickName);
      setPostCount(userPosts.length);
    }
  }, [user, posts]);

  if (!user) return null;

  const handleEditToggle = (user) => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = () => {
    // 여기서 백엔드 저장 로직을 넣을 수 있어요
    setIsEditing(false);
    // 실제로 저장한다면, 부모 컴포넌트에서 user를 업데이트하는 방식으로 연동해야 함
  };

  return (
    <ProfileContainer>
      <ProfileWrapper onClick={(e) => e.stopPropagation()}>
        <ProfileContent>
          <ProfileInfo>
            <ProfileImage src={user.img} />
            <InfoContainer>
              {isEditing ? (
                <>
                  <Input value={editedNick} onChange={(e) => setEditedNick(e.target.value)} />
                  <SaveButton onClick={handleSave}>저장</SaveButton>
                </>
              ) : (
                <>
                  <Nickname>{user.userNickName}</Nickname>
                  <EditButton onClick={handleEditToggle}>프로필 편집</EditButton>
                </>
              )}
            </InfoContainer>
            <SettingsButton>
              <CiSettings size={24} />
            </SettingsButton>
          </ProfileInfo>

          <BioSection>
            {isEditing ? (
              <Input value={editedUsername} onChange={(e) => setEditedUsername(e.target.value)} />
            ) : (
              <BioText>{user.username}</BioText>
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
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 30px;
`;

const InfoContainer = styled.div`
  width: 600px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const Nickname = styled.div`
  font-size: 28px;
  font-weight: 300;
  margin-bottom: 10px;
`;

const SettingsButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const BioSection = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const BioText = styled.div`
  font-size: 16px;
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

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
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

  &:hover {
    background-color: #379be0;
  }
`;

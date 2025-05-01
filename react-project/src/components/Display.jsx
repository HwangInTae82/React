import React from 'react';
import Post from './Post';
import styled from 'styled-components';

const Display = () => {
  return (
    <Wrapper>
      <Story>
        <ProfileWrapper>
          <WhiteBorder>
            <ProfileImage
              src="https://yt3.googleusercontent.com/4NCAXdjvs5H0zT0VfACbE6HpY5NLsREsTjzvv0Tr86G5IptFPheRKCNOMpqEWt5is5gCRNl2gow=s900-c-k-c0x00ffffff-no-rj"
              alt="profile"
            />
          </WhiteBorder>
        </ProfileWrapper>
        <ProfileWrapper>
          <WhiteBorder>
            <ProfileImage
              src="https://yt3.googleusercontent.com/4NCAXdjvs5H0zT0VfACbE6HpY5NLsREsTjzvv0Tr86G5IptFPheRKCNOMpqEWt5is5gCRNl2gow=s900-c-k-c0x00ffffff-no-rj"
              alt="profile"
            />
          </WhiteBorder>
        </ProfileWrapper>
        <ProfileWrapper>
          <WhiteBorder>
            <ProfileImage
              src="https://yt3.googleusercontent.com/4NCAXdjvs5H0zT0VfACbE6HpY5NLsREsTjzvv0Tr86G5IptFPheRKCNOMpqEWt5is5gCRNl2gow=s900-c-k-c0x00ffffff-no-rj"
              alt="profile"
            />
          </WhiteBorder>
        </ProfileWrapper>
      </Story>
      <Post />
    </Wrapper>
  );
};

export default Display;

const Wrapper = styled.div`
  width: 630px;
  margin: 0 auto;
`;

const Story = styled.div`
  display: flex;
  padding: 8px 0;
  gap: 17px;
`;
const ProfileWrapper = styled.div`
  width: 66px;
  height: 66px;
  border-radius: 50%;
  background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
  padding: 2.5px; /* 흰색 테두리 두께 */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WhiteBorder = styled.div`
  background: white;
  border-radius: 50%;
  padding: 2px; /* 이미지와의 간격 */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileImage = styled.img`
  width: 59px;
  height: 59px;
  border-radius: 50%;
  object-fit: cover;
`;

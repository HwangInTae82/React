import React from 'react';
import Post from './Post';
import styled from 'styled-components';

const Display = ({ user }) => {
  return (
    <Wrapper>
      <div>
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
                src="https://mblogthumb-phinf.pstatic.net/MjAyMTAzMDhfMTYw/MDAxNjE1MTg3MDkzNjk2.iIFjd26yUcvv3YvVbWuVFtG_isF5e0fiwNR96rjPk0cg.zCDWpUAwP-WvSxHYsjOhRZ9OCCZ457t858bAI4hbpBUg.JPEG.aksen244/6756faf2-74ac-4e89-a2da-292f15ec2aff.jpg?type=w800"
                alt="profile"
              />
            </WhiteBorder>
          </ProfileWrapper>
          <ProfileWrapper>
            <WhiteBorder>
              <ProfileImage
                src="https://mblogthumb-phinf.pstatic.net/MjAyMTAzMDhfMjIw/MDAxNjE1MTg3MDkyNTE5.W_ikeTvm03lRyDZx4x8u0Afd2Go6l14vkX1eacESNMkg.qQyFBc6S4V7DyWMZKemBoc6kuOsss7o_PSp0MVT6UP4g.JPEG.aksen244/-_Goals__%F0%9F%8D%83.jpg?type=w800"
                alt="profile"
              />
            </WhiteBorder>
          </ProfileWrapper>
          <ProfileWrapper>
            <WhiteBorder>
              <ProfileImage
                src="https://mblogthumb-phinf.pstatic.net/MjAyMDEyMDlfNjYg/MDAxNjA3NDgxMTMwODY5.91J2WKVtlyY3p4yjXdMop2qI2QZDWnrwjkYesrU3yPUg.lb4a65zfnfP7olu1a484LaEAAaWLBXB2n8C9S48Pn6Eg.GIF.sosohan_n/IMG_6537.GIF?type=w800"
                alt="profile"
              />
            </WhiteBorder>
          </ProfileWrapper>
          <ProfileWrapper>
            <WhiteBorder>
              <ProfileImage
                src="https://i.pinimg.com/736x/2c/2c/60/2c2c60b20cb817a80afd381ae23dab05.jpg"
                alt="profile"
              />
            </WhiteBorder>
          </ProfileWrapper>
          <ProfileWrapper>
            <WhiteBorder>
              <ProfileImage src="https://cdn.imweb.me/thumbnail/20240206/8e66c2cb5284d.jpg" alt="profile" />
            </WhiteBorder>
          </ProfileWrapper>
          <ProfileWrapper>
            <WhiteBorder>
              <ProfileImage
                src="https://menu.moneys.co.kr/moneyweek/thumb/2025/01/10/06/2025011016581868696_1.jpg"
                alt="profile"
              />
            </WhiteBorder>
          </ProfileWrapper>
          <ProfileWrapper>
            <WhiteBorder>
              <ProfileImage
                src="https://thumbnews.nateimg.co.kr/view610///news.nateimg.co.kr/orgImg/sw/2023/08/09/20230809506622.jpg"
                alt="profile"
              />
            </WhiteBorder>
          </ProfileWrapper>
        </Story>
        <Post />
      </div>
      <RightBar>
        <RightBarInside>
          <Profile>
            <ProfileImgDiv>
              <ProfileImg src={user.img} />
            </ProfileImgDiv>
            <ProfileData>
              <a style={{ fontWeight: 'bold' }} href="">
                {user.userNickName}
              </a>
              <span>{user.username}</span>
            </ProfileData>
            <ProfileChange>전환</ProfileChange>
          </Profile>
        </RightBarInside>
      </RightBar>
    </Wrapper>
  );
};

export default Display;

const Wrapper = styled.div`
  display: flex;
  width: 630px;
  margin: 0 auto;
  margin: 0;
  margin-left: 35%;
  transform: translateX(-50%);
`;

const Story = styled.div`
  display: flex;
  padding: 8px 0;
  gap: 17px;
`;

const RightBar = styled.div`
  width: 383px;
  padding: 0 0 0 64px;
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
  cursor: pointer;
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

const RightBarInside = styled.div`
  margin: 36px 0 0;
`;

const Profile = styled.div`
  display: flex;
  width: 319px;
  height: 44px;
  padding: 0 16px;
`;

const ProfileImg = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 2px;
`;
const ProfileImgDiv = styled.div`
  width: 20%;
`;

const ProfileData = styled.div`
  width: 65%;
  display: flex;
  text-align: left;
  flex-direction: column;
`;
const ProfileChange = styled.div`
  width: 15%;
`;

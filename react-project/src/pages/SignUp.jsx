import React from 'react';
import styled from 'styled-components';

const SignUp = () => {
  return (
    <All>
      <Wrapper>
        <div></div>
        <div>
          <MetaLogoImg src="https://blog.kakaocdn.net/dn/cf2aNI/btsCbfy0Z11/CKBSZK5gdmeKEuDaZQKKlk/Meta_Platforms-Logo.wine.png?attach=1&knm=img.png" />
        </div>
        <div>
          <span>Instagram에서 시작하기</span> <br />
          <span>친구들의 사진과 동영상을 보려면 가입하세요.</span>
        </div>
        <div>
          <span>휴대폰 번호 또는 이메일 주소</span> <br />
          <InputText type="text" placeholder="휴대폰 번호 또는 이메일 주소" />
          <br />
          <span>회원님은 저희가 보내는 알림을 받을 수 있습니다. 회원님의 연락처 정보가 필요한 이유를 알아보세요</span>
        </div>
        <div>
          <span>비밀번호</span>
          <br />
          <InputText type="password" placeholder="비밀번호" />
        </div>
        <div>
          <span>생년월일</span>
          <br />
        </div>
        <div>
          <span>이름</span>
          <br />
          <InputText type="text" placeholder="성명" />
        </div>
        <div>
          <span>사용자 이름</span>
          <br />
          <InputText type="text" placeholder="사용자 이름" />
        </div>
        <div>
          <span>
            저희 서비스를 이용하는 사람이 회원님의 연락처 정보를 Instagram에 업로드했을 수도 있습니다. 더 알아보기.
          </span>
        </div>
        <ButtonDiv>
          <LoginButton type="submit">제출</LoginButton>
          <SignUpButton>이미 계정이 있습니다.</SignUpButton>
        </ButtonDiv>
      </Wrapper>
    </All>
  );
};

export default SignUp;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  text-align: left;
  margin: 0 auto;
`;

const All = styled.div`
  width: 100vw;
  height: 100vh;
`;

const MetaLogoImg = styled.img`
  width: 80px;
  margin-left: -10px;
`;

const InputText = styled.input`
  border: 1px solid #bbbbbb;
  padding: 10px 16px;
  border-radius: 18px;
  width: 100%;
  height: 60px;
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #0064e0;
  height: 44px;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
`;

const SignUpButton = styled.button`
  width: 100%;
  height: 44px;
  padding: 10px;
  background: white;
  color: #000000;
  border: #cccccc solid 1px;
  border-radius: 30px;
  cursor: pointer;
`;

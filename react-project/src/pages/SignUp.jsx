import React, { useState } from 'react';
import styled from 'styled-components';
import { GrCircleQuestion } from 'react-icons/gr';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [userNickName, setUserNickName] = useState('');

  const navigate = useNavigate();

  const years = Array.from({ length: 100 }, (_, i) => 2025 - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleSubmit = async (e) => {
    if (!email || !password || !username || !userNickName || !year || !month || !day) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    e.preventDefault();

    const birthDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    const userData = {
      img: 'https://i.namu.wiki/i/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp',
      email: email,
      password: password,
      username: username,
      userNickName: userNickName,
      birthDate: birthDate,
    };

    try {
      await axios.post('http://localhost:3001/users', userData);
      alert('회원가입 성공!');
      navigate('/');
    } catch (error) {
      console.error('회원가입 실패', error);
    }
  };

  return (
    <All>
      <Wrapper>
        <div></div>
        <div>
          <MetaLogoImg src="https://blog.kakaocdn.net/dn/cf2aNI/btsCbfy0Z11/CKBSZK5gdmeKEuDaZQKKlk/Meta_Platforms-Logo.wine.png?attach=1&knm=img.png" />
        </div>
        <div>
          <InputUpText style={{ fontSize: 24 }}>Instagram에서 시작하기</InputUpText> <br />
          <span style={{ fontSize: 15 }}>친구들의 사진과 동영상을 보려면 가입하세요.</span>
        </div>
        <div>
          <PaddingBox>
            <InputUpText>휴대폰 번호 또는 이메일 주소</InputUpText>
          </PaddingBox>
          <InputText
            type="text"
            placeholder="휴대폰 번호 또는 이메일 주소"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div style={{ paddingTop: 16 }}>
            <span style={{ fontSize: 15 }}>
              회원님은 저희가 보내는 알림을 받을 수 있습니다.{' '}
              <AddA>회원님의 연락처 정보가 필요한 이유를 알아보세요</AddA>
            </span>
          </div>
        </div>
        <div>
          <PaddingBox>
            <InputUpText>비밀번호</InputUpText>
          </PaddingBox>
          <InputText
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <PaddingBox>
            <InputUpText>생년월일</InputUpText>
            <GrCircleQuestion size={20} />
          </PaddingBox>
          <SelectBoxContainer>
            <StyledSelect value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="">연도</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </StyledSelect>
            <StyledSelect value={month} onChange={(e) => setMonth(e.target.value)}>
              <option value="">월</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </StyledSelect>
            <StyledSelect value={day} onChange={(e) => setDay(e.target.value)}>
              <option value="">일</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </StyledSelect>
          </SelectBoxContainer>
        </div>
        <div>
          <PaddingBox>
            <InputUpText>이름</InputUpText>
          </PaddingBox>
          <InputText type="text" placeholder="성명" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <PaddingBox>
            <InputUpText>사용자 이름</InputUpText>
          </PaddingBox>
          <InputText
            type="text"
            placeholder="사용자 이름"
            value={userNickName}
            onChange={(e) => setUserNickName(e.target.value)}
          />
        </div>
        <div style={{ paddingTop: 20, paddingBottom: 15 }}>
          <span style={{ fontSize: 15 }}>
            저희 서비스를 이용하는 사람이 회원님의 연락처 정보를 Instagram에 업로드했을 수도 있습니다.
            <AddA>더 알아보기.</AddA>
          </span>
        </div>
        <ButtonDiv>
          <LoginButton type="submit" onClick={handleSubmit}>
            제출
          </LoginButton>
          <SignUpButton onClick={() => navigate('/')}>이미 계정이 있습니다.</SignUpButton>
        </ButtonDiv>
      </Wrapper>
    </All>
  );
};

export default SignUp;

const All = styled.div`
  width: 100vw;
  height: 100vh;
  font-family: 'Segoe UI Historic', 'Segoe UI', sans-serif;
`;

const Wrapper = styled.div`
  width: 600px;
  padding: 0 20px;
  margin: 0 auto;
  text-align: left;
`;

const MetaLogoImg = styled.img`
  width: 80px;
  margin-left: -10px;
`;

const InputText = styled.input`
  border: 1px solid #d1d5db;
  padding: 10px 16px;
  border-radius: 15px;
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
  border: #d1d5db solid 1px;
  border-radius: 30px;
  cursor: pointer;
`;

const InputUpText = styled.span`
  font-size: 17px;
  color: #0a1317;
  font-weight: 600;
`;

const PaddingBox = styled.div`
  display: flex;
  width: fit-content;
  padding: 6px 6px 6px 0px;
  align-items: center;
`;

const AddA = styled.a`
  color: #0064e0;
  font-weight: bold;
`;

const SelectBoxContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const StyledSelect = styled.select`
  width: 190px;
  height: 60px;
  border: 1px solid #d1d5db;
  color: #333333;
  border-radius: 15px;
  padding: 0 12px;
  font-size: 16px;
  appearance: none;
  background-color: white;
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='12' viewBox='0 0 24 24' width='12' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px;
`;

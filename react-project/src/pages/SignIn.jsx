import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import React from 'react';
import * as yup from 'yup';
import styled from 'styled-components';
import { Navigate, useAsyncError, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useUserStore from '../store/userStore';
import { BiVolume } from 'react-icons/bi';

const schema = yup.object().shape({
  email: yup.string().email('유효한 이메일 형식이 아닙니다.').required('이메일주소를 입력하세요.'),
  password: yup.string().required('비밀번호를을 입력하세요.'),
});

const SignIn = () => {
  const setUser = useUserStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.get('http://localhost:3001/users');
      const users = response.data;

      const user = users.find((u) => u.email === data.email && u.password === data.password);

      if (user) {
        setUser(user);
        alert(`로그인 성공! 환영합니다, ${user.username}님`);
        navigate('/home');
      } else {
        alert('이메일 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('로그인 요청 중 오류 발생:', error);
      alert('서버에 연결할 수 없습니다.');
    }
  };

  const navigate = useNavigate();

  return (
    <Wrapper>
      <Introduce>
        <LogoImg src="https://png.pngtree.com/png-clipart/20180626/ourmid/pngtree-instagram-icon-instagram-logo-png-image_3584853.png" />

        <span style={{ fontSize: 45, fontWeight: 'bold' }}>나를 이해하는 사람들과 관심사를 공유해보세요!!</span>
        <div>
          <IntroduceImg src="/src/img/Feta-IG-Web-A.png" alt="" />
        </div>
      </Introduce>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <InstaLoginText>Instagram으로 로그인</InstaLoginText>
        <InputText type="email" {...register('email')} placeholder="이메일 주소" />
        {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

        <InputText type="password" {...register('password')} placeholder="비밀번호" />
        {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
        <LoginButton type="submit">로그인</LoginButton>
        <span>비밀번호를 잊으셨나요?</span>
        <SignUpDiv>
          <SignUpButton type="button" onClick={() => navigate('/signup')}>
            새 계정 만들기
          </SignUpButton>
        </SignUpDiv>
        <div>
          <MetaLogoImg src="https://blog.kakaocdn.net/dn/cf2aNI/btsCbfy0Z11/CKBSZK5gdmeKEuDaZQKKlk/Meta_Platforms-Logo.wine.png?attach=1&knm=img.png" />
        </div>
      </FormWrapper>
    </Wrapper>
  );
};

export default SignIn;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

const LogoImg = styled.img`
  width: 100px;
`;

const Introduce = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  padding: 40px 0;
  border-right: 2px solid #eeeeee;
`;

const IntroduceImg = styled.img`
  width: 1000px;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: 'Segoe UI Historic', 'Segoe UI', sans-serif;
  gap: 12px;
  padding: 0 50px;
  width: 30%;
`;

const ErrorText = styled.p`
  font-size: 12px;
  color: red;
  margin: -8px 0 8px 0;
`;

const InputText = styled.input`
  border: 1px solid #bbbbbb;
  padding: 10px 16px;
  border-radius: 18px;
  width: 100%;
  font-size: 17px;
  height: 60px;
`;

const LoginButton = styled.button`
  padding: 10px;
  background: #0064e0;
  height: 44px;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
`;

const SignUpDiv = styled.div`
  margin: 6px 0;
  padding: 40px 0 0;
`;
const SignUpButton = styled.button`
  width: 100%;
  height: 44px;
  padding: 10px;
  background: white;
  color: #0064e0;
  border: #0064e0 solid 1px;
  border-radius: 30px;
  cursor: pointer;
`;

const InstaLoginText = styled.span`
  font-size: 17px;
  text-align: left;
`;

const MetaLogoImg = styled.img`
  width: 100px;
`;

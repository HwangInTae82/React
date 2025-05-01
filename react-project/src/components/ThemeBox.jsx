import React from 'react';
import styled from 'styled-components';
import { MdModeNight } from 'react-icons/md';
import { FaSun } from 'react-icons/fa6';

const ThemeBox = ({ onToggleTheme }) => {
  return (
    <Wrapper>
      <ToggleButton onClick={onToggleTheme}>
        <FaSun /> <MdModeNight /> 테마 토글
      </ToggleButton>
    </Wrapper>
  );
};

export default ThemeBox;

const Wrapper = styled.div`
  padding: 40px;
  text-align: center;
`;

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: ${({ theme }) => theme.primary};
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  transition: 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

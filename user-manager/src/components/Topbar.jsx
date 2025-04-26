import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const TopBar = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    background: #f5f5f5;
    gap: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const StyledButton = styled.button`
    padding: 10px 20px;
    background-color: #5f5f5f;
    color: white;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s, transform 0.2s;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    &:hover {
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }
`;

const Topbar = () => {
    const navigate = useNavigate();

    return (
        <TopBar>
            <StyledButton onClick={() => navigate(`/user`)}>유저 등록</StyledButton>
            <StyledButton onClick={() => navigate(`/`)}>목록으로</StyledButton>
        </TopBar>
    );
}

export default Topbar;

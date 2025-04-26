import styled from 'styled-components';
import React from 'react';

const Card = styled.div`
    border: 2px solid #ddd;
    padding: 20px;
    border-radius: 12px;
    background: #e0e0e0;
    font-family: sans-serif;
    width: 320px;
    height: fit-content;
    cursor: pointer;
`;

const Name = styled.h2`
    font-size: 24px;
    margin-bottom: 10px;
`;

const Age = styled.p`
    font-size: 18px;
    margin-bottom: 10px;
`;

const Status = styled.p`
    font-size: 16px;
    color: ${props => (props.$isOnline ? '#4CAF50' : '#F44336')};
`;

const Img = styled.img`
    height: 270px;
    border-radius: 10px;
    border: 4px solid #f0f0f0;
`



const ProfileCard = ({ img, name, age, isOnline, onClick }) => {
    return (
        <Card onClick={onClick}>
            <Img src={img} />
            <Name>{name}</Name>
            <Age>나이 : {age}</Age>
            <Status $isOnline={isOnline}>
                {isOnline ? '🟢 온라인 상태입니다.' : '🔴 오프라인 상태입니다.'}
            </Status>
        </Card>
    );
};


export default ProfileCard;

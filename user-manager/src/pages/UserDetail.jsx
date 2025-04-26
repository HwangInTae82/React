import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    font-family: 'Noto Sans KR', sans-serif;
    min-height: 100vh;
`

const Card = styled.div`
    background: #e0e0e0;
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 350px;
`

const Img = styled.img`
    height: 270px;
    border-radius: 10px;
    border: 4px solid #f0f0f0;
`

const Name = styled.h1`
    font-size: 28px;
    color: #333;
    margin-bottom: 10px;
`

const Age = styled.p`
    font-size: 20px;
    color: #666;
    margin-bottom: 10px;
`

const Status = styled.div`
    font-size: 18px;
    color: ${props => (props.$isOnline ? '#4CAF50' : '#F44336')};
    margin-top: 20px;
    font-weight: bold;
`

const ButtonGroup = styled.div`
    margin-top: 30px;
    display: flex;
    gap: 10px;
    justify-content: center;
`

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    background-color: ${props => props.bgColor || '#ccc'};
    color: white;
    font-weight: bold;

    &:hover {
        opacity: 0.8;
    }
`

const UserDetail = ({ users, setUsers }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const user = users.find(u => u.id === id);

    if (!user) {
        return <Container>유저를 찾을 수 없습니다.</Container>;
    }

    const handleBack = () => {
        navigate('/');
    }

    const handleDelete = () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            const updatedUsers = users.filter(u => u.id !== id);
            setUsers(updatedUsers);
            navigate('/');
        }
    }

    return (
        <Container>
            <Card>
                <Img src={user.img} alt={user.name} />
                <Name>{user.name}</Name>
                <Age>나이: {user.age}살</Age>
                <Status $isOnline={user.isOnline}>
                    {user.isOnline ? '🟢 온라인 상태' : '🔴 오프라인 상태'}
                </Status>
                <ButtonGroup>
                    <Button bgColor="#4CAF50" onClick={handleBack}>← 목록으로</Button>
                    <Button bgColor="#F44336" onClick={handleDelete}>🗑 삭제하기</Button>
                </ButtonGroup>
            </Card>
        </Container>
    );
}

export default UserDetail;

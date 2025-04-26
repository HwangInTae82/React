import React, { useState } from 'react'
import Topbar from '../components/Topbar'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Body = styled.div`
    width: 100%;
    min-height: 100vh;
    padding: 40px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
`;

const Main = styled.table`
    margin-top: 20px;
    padding: 40px;
    width: 100%;
    max-width: 800px;
    border-radius: 16px;
    background: #e0e0e0;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    font-size: 18px;
    color: #333;
    font-weight: 500;
    border: 1px solid #616161;;
`;

const Input = styled.input`
    width: 100%;
    font-size: 18px;
    padding: 14px 16px;
    margin-top: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    outline: none;
    transition: all 0.3s ease;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);

    &:focus {
        border-color: #000000;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
    }
`;

const SaveButton = styled.button`
    font-size: 18px;
    padding: 14px 30px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: background 0.3s;
    &:hover {
        background: #43a047;
    }
`;

const CancelButton = styled.button`
    font-size: 18px;
    padding: 14px 30px;
    background: #f44336;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: background 0.3s;
    &:hover {
        background: #e53935;
    }
`;

const UserRegistration = ({ users, setUsers }) => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [img, setImg] = useState('');
    const [isOnline, setIsOnline] = useState(false);

    const onSave = () => {
        if (!name || !age) {
            alert('이름과 나이를 모두 입력해주세요.');
            return;
        }

        const defaultImg = 'https://us.123rf.com/450wm/koblizeek/koblizeek2306/koblizeek230600007/209238542-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EB%B2%A1%ED%84%B0-%EA%B8%B0%ED%98%B8%EA%B0%80-%EC%97%86%EC%8A%B5%EB%8B%88%EB%8B%A4-%EC%82%AC%EC%9A%A9-%EA%B0%80%EB%8A%A5%ED%95%9C-%EC%95%84%EC%9D%B4%EC%BD%98%EC%9D%B4-%EC%97%86%EC%8A%B5%EB%8B%88%EB%8B%A4-%ED%98%84%EC%9E%AC-%EC%9E%90%EB%A6%AC-%ED%91%9C%EC%8B%9C%EC%9E%90%EC%97%90%EB%8A%94-%EA%B0%A4%EB%9F%AC%EB%A6%AC%EA%B0%80.jpg?ver=6';

        const newUser = {
            img: img || defaultImg,
            id: Date.now().toString(),
            name,
            age: Number(age),
            isOnline,
        };

        setUsers([...users, newUser]);
        navigate('/');
    };

    const onCancel = () => {
        navigate('/');
    };

    const onChangeName = (e) => {
        setName(e.target.value);
    };

    const onChangeAge = (e) => {
        setAge(e.target.value);
    };

    const onChangeImg = (e) => {
        setImg(e.target.value);
    };

    const onChangeOnline = (e) => {
        setIsOnline(e.target.value === 'true');
    };

    return (
        <>
            <Topbar />
            <Body>
                <Main>
                    <tbody>
                        <tr>
                            <td>프로필이미지 URL :</td>
                            <td><Input
                                type="text"
                                value={img}
                                onChange={onChangeImg}
                            /></td>
                        </tr>
                        <tr>
                            <td colSpan={2}>  {img && <img src={img} alt="preview" style={{ width: '250px', height: '250px', objectFit: 'cover', borderRadius: '12px' }} />}</td>
                        </tr>
                        <tr>
                            <td>이름 :</td>
                            <td><Input type="text" value={name} onChange={onChangeName} placeholder='이름을 입력하세요.' /></td>
                        </tr>
                        <tr>
                            <td>나이 :</td>
                            <td><Input type="number" value={age} onChange={onChangeAge} /></td>
                        </tr>
                        <tr>
                            <td>온라인여부 :</td>
                            <td>
                                <label>
                                    <input
                                        type="radio"
                                        name="online"
                                        value="true"
                                        checked={isOnline === true}
                                        onChange={onChangeOnline}
                                    />
                                    온라인
                                </label>
                                <label style={{ marginLeft: '20px' }}>
                                    <input
                                        type="radio"
                                        name="online"
                                        value="false"
                                        checked={isOnline === false}
                                        onChange={onChangeOnline}
                                    />
                                    오프라인
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td style={{ textAlign: 'right' }}>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
                                    <CancelButton onClick={onCancel}>취소</CancelButton>
                                    <SaveButton onClick={onSave}>저장</SaveButton>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </Main>
            </Body>
        </>
    );
};

export default UserRegistration;

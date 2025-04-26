import React, { useState } from 'react'
import Topbar from '../components/Topbar'
import styled from 'styled-components'

const Body = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;
`
const Main = styled.table`
    margin-top: 20px;
    border-radius: 12px;
    padding: 20px;
    width: 50%;
    flex-direction: column;
    gap: 20px;
    background: #b1b1b1;
    font-size: 24px;
`

const Input = styled.input`
    font-size: 24px;
    padding: 10px;
`

const UserRegistration = () => {
    const [name, setName] = useState('');

    const [age, setAge] = useState(0);

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeAge = (e) => {
        setAge(e.target.value);
    }

    const [img, setImg] = useState('');
    const onChangeImg = (e) => {
        setImg(e.target.value);
    }

    const [isOnline, setIsOnline] = useState(false);

    const onChangeOnline = (e) => {
        setIsOnline(e.target.value === 'true');
    };



    return (
        <>
            <Topbar />
            <Body>
                <Main>
                    <tr>
                        <td>프로필이미지 URL :</td>
                        <td><Input
                            type="text"
                            value={img}
                            onChange={onChangeImg}
                        /></td>
                    </tr>
                    <tr>
                        <td colSpan={2}>  {img && <img src={img} alt="preview" style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />}</td>
                    </tr>
                    <tr>
                        <td>  이름 :</td>
                        <td><Input type="text" value={name} onChange={onChangeName} placeholder='이름을 입력하세요.' /></td>
                    </tr>
                    <tr>
                        <td>  나이 :</td>
                        <td><Input type="number" value={age} onChange={onChangeAge} /></td>
                    </tr>
                    <tr>
                        <td>  온라인여부 :</td>
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
                            <button>저장</button>
                        </td>

                    </tr>
                </Main>
            </Body>
        </>
    )
}

export default UserRegistration
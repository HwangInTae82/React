import React from 'react'
import styled from 'styled-components'
import ProfileCard from '../components/ProfileCard'
import { useNavigate } from 'react-router-dom'
import Topbar from '../components/Topbar'

const List = styled.div`
    width: 80%;
    display: flex;
    justify-content: center;
    padding: 20px;
    gap: 10px;
    flex-wrap: wrap;
    font-family: 'Noto Sans KR', sans-serif;
`

const UserList = ({ users }) => {
    const navigate = useNavigate()

    const goToProfile = (id) => {
        navigate(`/user/${id}`)
    }

    return (
        <div style={{ 
            width: '100%', 
            color: 'black', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems:'center'
        }}>
            <Topbar />
            <List>
                    {users.length > 0 ? (
                    users.map(user => (
                        <ProfileCard
                            img={user.img}
                            key={user.id}
                            name={user.name}
                            age={user.age}
                            isOnline={user.isOnline}
                            onClick={() => goToProfile(user.id)}
                        />
                    ))
                    ) : (
                        <h1>유저가 없습니다.ㅠ <br /><p>추가하세용</p></h1>
                    )}
            </List>
        </div>
    )
}

export default UserList
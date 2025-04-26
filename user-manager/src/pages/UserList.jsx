import React from 'react'
import styled from 'styled-components'
import ProfileCard from '../components/ProfileCard'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Topbar from '../components/Topbar'

const List = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    background: #7a7a7a;
    color: black;
    padding: 20px;
    gap: 10px;
`

const UserList = ({ users }) => {
    const navigate = useNavigate()

    const goToProfile = (id) => {
        navigate(`/user/${id}`)
    }

    return (
        <>
            <Topbar />
            <List>
                {users.map(user => (
                    <ProfileCard
                        img={user.img}
                        key={user.id}
                        name={user.name}
                        age={user.age}
                        isOnline={user.isOnline}
                        onClick={() => goToProfile(user.id)}
                    />
                ))}
            </List>
        </>
    )
}

export default UserList
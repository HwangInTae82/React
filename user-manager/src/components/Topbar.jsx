import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'


const TopBar = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 5px 20px;
    background: #dfdfdf;
`

const Topbar = () => {
    const navigate = useNavigate()

    return (
        <TopBar>
            <button onClick={() =>  navigate(`/user`)}>유저 등록</button>
        </TopBar>
    )
}

export default Topbar
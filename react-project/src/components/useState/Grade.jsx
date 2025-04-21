import React, { useState } from 'react'

const Grade = ({isLogin, onClickLogin, onClickLogout}) => {

    return (
        <div>
            {isLogin && 
            <div>실버 등급</div>}
        </div>
    )
}

export default Grade
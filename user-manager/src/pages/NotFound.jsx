import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div style={{marginTop:100}}>
            <img 
                src="https://cdn.maily.so/mailyd7a173c865c6db745fdc55e85e988db71624489210" 
                alt="errorImg"
            />
            <h2>페이지를 찾을 수 없습니다. (404)</h2>
            <button onClick={() => {navigate("/")}}>홈으로가기</button>
        </div>
    )
}

export default NotFound
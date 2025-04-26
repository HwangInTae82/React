import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    //원하는 경로로 페이지를 이동할 수 있게 해주는 hook
    const navigate = useNavigate();
    return (
        <div style={{marginTop:100}}>
            <img 
                src="https://i.namu.wiki/i/yP-Gu9tyXyNmuLWUJhwuiF8Z5_FvomOD06QxW03y-MX1dgTU5NXWdMtzFjQKBp88LlrvHjTfbPXkl0CztuecfzMroBDb5galje8QpNlkZM32COsbHBdi7aGNkGUp5hBQMNM22tjDgFR8GceQ0StM6g.webp" 
                alt="errorImg"
                style={{width:500, height:500}}
            />
            <h2>페이지를 찾을 수 없습니다. (404)</h2>
            <button onClick={() => {navigate("/")}}>홈으로가기</button>
        </div>
    )
}

export default NotFound
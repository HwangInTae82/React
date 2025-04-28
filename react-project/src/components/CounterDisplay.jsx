import React from 'react'
import styled from 'styled-components'
import useCounterStore from '../store/useCounterStore'

const Displaycontainer = styled.div`
    font-size: 32px;
    margin: 16px;
    padding: 20px;
    border-radius: 8pxs;

`
const CountText = styled.span`
    font-weight: bold;
`

const CounterDisplay = () => {
    //const count = useCounterStore((state) => state.count);
    const { count } = useCounterStore();
    
    return (
        <Displaycontainer>
            현재 카운트 : <CountText>{ count }</CountText>
        </Displaycontainer>
    )
}

export default CounterDisplay
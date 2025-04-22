import React from 'react'
import styled from 'styled-components'

const TodoItemContainer = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 12px;
    border: 1px solid #cfcfcf;
    margin-bottom: 12px;
    border-radius: 6px;
`
const TodoContent = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`
const TodoText = styled.span`
    text-decoration: ${props => props.completed ? 'line-through' : 'none'};
    color:  ${props => props.completed ? 'inherit' : '#10cc5f'};
`
const Checkbox = styled.input`
    width: 18px;
    height: 18px;
`
const  DeleteButton = styled.button`
    color: #fc1717;
    background: none;
    border: none;
    cursor: pointer;

    &:hover{
        color: #b40d0d;
    }
`

const TodoItem = ({ todo, onToggle, onDelete }) => {
    return (
        <TodoItemContainer>
            <TodoContent>
                <Checkbox
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                />
                <TodoText completed = {todo.completed}>
                    {todo.text}
                </TodoText>
            </TodoContent>
            <DeleteButton onClick={() => onDelete(todo.id)}>
                삭제
            </DeleteButton>
        </TodoItemContainer>
    )
}

export default TodoItem
import React, { useEffect, useState } from 'react'
import usePostStore from '../store/postStore'
import {
    ButtonContainer,
    Container,
    Content,
    Error,
    Loading,
    LoadingOverlay,
    PostCard,
    Title
} from './styled/PostList.styled'
import { Button } from './styled/common';
import styled from 'styled-components';

const ControlButton = styled.button`
    display: inline-block;
    background: #4253ec;
    color: white;
    padding: 12px 24px;
    border-radius: 4px;
    text-decoration: none;
    margin: 0px;
    cursor: pointer;

    &:hover{
        opacity: 0.9;
        color: white;
    }
`



const PostList = () => {
    const { posts, error, loading, getPosts, deletePost } = usePostStore();
    const [deletePostId, setDeletePostId] = useState(null);

    useEffect(() => {
        getPosts();
    }, [getPosts])

    if (loading && posts.length === 0) return <Loading>로딩중...</Loading>
    if (error) return <Error>에러발생 : {error}</Error>

    const handleDelete = async (id) => {
        setDeletePostId(id);
        await deletePost(id);
        setDeletePostId(null);
    }

    return (
        <Container>
            {posts.map((post) => (
                <PostCard
                    key={post.id}
                >
                    <Title>{post.title}</Title>
                    <Content>{post.body}</Content>
                    <ButtonContainer>
                        <ControlButton>수정</ControlButton>
                        <ControlButton
                            disabled={loading}
                            onClick={() => handleDelete(post.id)}
                        >
                            {deletePostId === post.id ? "삭제중..." : "삭제"}
                        </ControlButton>
                    </ButtonContainer>
                    {deletePostId === post.id && (
                        <LoadingOverlay>
                            <div>삭제중...</div>
                        </LoadingOverlay>
                    )
                    }
                </PostCard>
            ))}
        </Container>
    )
}

export default PostList
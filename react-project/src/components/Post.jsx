import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { FaRegComment } from 'react-icons/fa';
import { LuSend } from 'react-icons/lu';
import { BsBookmark, BsThreeDots } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import useUserStore from '../store/userStore';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

const Post = () => {
  const user = useUserStore((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState({});
  const [showOptions, setShowOptions] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [editText, setEditText] = useState('');
  const location = useLocation();

  // 게시물 데이터 가져오기
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8585/api/boards');
      setPosts(response.data.reverse()); // 최신 게시물이 위에 오도록 정렬

      // 좋아요 상태 초기화
      const initialLikes = {};
      response.data.forEach((post) => {
        initialLikes[post.id] = false;
      });
      setLikes(initialLikes);

      setLoading(false);
    } catch (err) {
      setError('게시물을 가져오는 데 실패했습니다.');
      setLoading(false);
      console.error('Error fetching posts:', err);
    }
  };

  // 컴포넌트 마운트시 게시물 가져오기
  useEffect(() => {
    fetchPosts();
  }, []);

  // location.state가 변경될 때 게시물 다시 가져오기 (새로운 게시물이 추가됐을 때)
  useEffect(() => {
    if (location.state?.refresh) {
      fetchPosts();
    }
  }, [location.state]);

  // 좋아요 토글 핸들러
  const toggleLike = (postId) => {
    setLikes((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  // 게시물 옵션 메뉴 표시/숨김
  const toggleOptions = (postId) => {
    setShowOptions(showOptions === postId ? null : postId);
  };

  // 게시물 수정 모드 설정
  const startEditing = (post) => {
    setEditingPost(post.id);
    setEditText(post.text);
    setShowOptions(null);
  };

  // 게시물 수정 취소
  const cancelEditing = () => {
    setEditingPost(null);
    setEditText('');
  };

  // 게시물 수정 저장
  const saveEdit = async (postId) => {
    try {
      await axios.patch(`http://localhost:3001/posts/${postId}`, {
        text: editText,
      });

      // 포스트 목록 업데이트
      setPosts(posts.map((post) => (post.id === postId ? { ...post, text: editText } : post)));

      // 편집 모드 종료
      setEditingPost(null);

      alert('게시물이 수정되었습니다.');
    } catch (err) {
      console.error('Error updating post:', err);
      alert('게시물 수정에 실패했습니다.');
    }
  };

  // 게시물 삭제
  const deletePost = async (posts) => {
    if (window.confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
      try {
        await axios.delete(`http://localhost:8585/posts/${posts.board_no}`);

        // 포스트 목록에서 삭제된 게시물 제거
        setPosts(posts.filter((posts) => posts.board_no !== posts.board_no));

        setShowOptions(null);
        alert('게시물이 삭제되었습니다.');
      } catch (err) {
        console.error('Error deleting post:', err);
        alert('게시물 삭제에 실패했습니다.');
      }
    }
  };

  if (loading) return <LoadingMessage>게시물을 불러오는 중...</LoadingMessage>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (posts.length === 0) return <EmptyMessage>게시물이 없습니다.</EmptyMessage>;

  return (
    <Wrapper>
      {posts.map((post) => (
        <PostContainer key={post.id}>
          <PostHeader>
            <ProfileImg src={post.user_img} />
            <Username>{post.user_nickname}</Username>
            <PostTime>• {dayjs(post.create_time).fromNow()}</PostTime>
            <OptionsButtonContainer>
              <OptionsButton onClick={() => toggleOptions(post.id)}>
                <BsThreeDots size={20} />
              </OptionsButton>

              {/* 게시물 옵션 메뉴 */}
              {showOptions === post.id && (
                <OptionsMenu>
                  <OptionItem onClick={() => startEditing(post)}>수정</OptionItem>
                  <OptionItem className="delete" onClick={() => deletePost(post.id)}>
                    삭제
                  </OptionItem>
                  <OptionItem onClick={() => toggleOptions(null)}>취소</OptionItem>
                </OptionsMenu>
              )}
            </OptionsButtonContainer>
          </PostHeader>

          <PostImage src={post.img} />

          <PostActions>
            <ActionButtons>
              <ActionButton onClick={() => toggleLike(post.id)}>
                {likes[post.id] ? <FaHeart color="red" size={24} /> : <FaRegHeart size={24} />}
              </ActionButton>
              <ActionButton>
                <FaRegComment size={24} />
              </ActionButton>
              <ActionButton>
                <LuSend size={24} />
              </ActionButton>
            </ActionButtons>
            <ActionButton>
              <BsBookmark size={24} />
            </ActionButton>
          </PostActions>

          <LikeCount>좋아요 {likes[post.id] ? '1개' : '0개'}</LikeCount>

          {/* 게시물 내용 (수정 모드 또는 표시 모드) */}
          {editingPost === post.id ? (
            <EditContainer>
              <EditTextArea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                placeholder="게시물 내용을 수정하세요..."
              />
              <EditButtons>
                <EditButton onClick={() => saveEdit(post.id)}>저장</EditButton>
                <EditButton onClick={cancelEditing}>취소</EditButton>
              </EditButtons>
            </EditContainer>
          ) : (
            <PostContent>
              <Username>{post.user_nickname}</Username> {post.board_content}
            </PostContent>
          )}

          <CommentInput placeholder="댓글 달기..." />
        </PostContainer>
      ))}
    </Wrapper>
  );
};

export default Post;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 630px;
`;

const PostContainer = styled.div`
  border: 1px solid #eeeeee;
  border-radius: 8px;
  margin-bottom: 24px;
  background-color: white;
  overflow: hidden;
  padding: 0 40px;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 14px;
  position: relative;
`;

const ProfileImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 12px;
`;

const Username = styled.span`
  font-weight: 600;
  margin-right: 5px;
`;

const PostTime = styled.span`
  color: #8e8e8e;
  font-size: 14px;
`;

const OptionsButtonContainer = styled.div`
  position: relative;
  margin-left: auto;
`;

const PostImage = styled.img`
  width: 90%;
  height: auto;
  object-fit: cover;
`;

const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
`;

const LikeCount = styled.div`
  display: flex;
  font-weight: 600;
  padding: 0 16px 8px;
`;

const PostContent = styled.div`
  display: flex;
  padding: 0 16px 12px;
  line-height: 1.4;
`;

const CommentInput = styled.input`
  width: 100%;
  padding: 16px;
  border: none;
  border-top: 1px solid #eeeeee;
  outline: none;
  font-size: 14px;
  box-sizing: border-box;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 16px;
  color: #8e8e8e;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 16px;
  color: #ed4956;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  font-size: 16px;
  color: #8e8e8e;
`;

const OptionsButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OptionsMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  z-index: 10;
  width: 120px;
`;

const OptionItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }

  &.delete {
    color: #ed4956;
  }
`;

const EditContainer = styled.div`
  padding: 12px 16px;
`;

const EditTextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #eeeeee;
  border-radius: 4px;
  font-size: 14px;
  min-height: 80px;
  resize: none;
  margin-bottom: 10px;
  outline: none;

  &:focus {
    border-color: #b3b3b3;
  }
`;

const EditButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const EditButton = styled.button`
  background-color: #0095f6;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #0074cc;
  }

  &:nth-child(2) {
    background-color: transparent;
    color: #262626;

    &:hover {
      background-color: #f5f5f5;
    }
  }
`;

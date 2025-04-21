import React, { Component } from 'react'
import Comment from './Comment';

const serverCommnets = [
    {
        id: 1,
        message: "안녕하세요. 황인태입니다.",
    },
    {
        id: 2,
        message: "이제 여름이 시작하나요?",
    },
    {
        id: 3,
        message: "냉면이 먹고싶습니다.",
    }
]

class CommentList extends Component {
    constructor(props){
        super(props);
        this.state = {
            commentList: [],
        }
    }

   

    componentDidMount(){
        //setInterval : 일정시간마다 반복되서 동작하는 비동기 함수

        setInterval(() => {
        const {commentList } = this.state;

            if(commentList.length < serverCommnets.length){
                const nextComment = serverCommnets[commentList.length];
                
                this.setState({
                    commentList: [...commentList, nextComment],
                });
            }else{
                this.setState({
                    commentList: []
                })
            }
        }, 3000);
    }

  static propTypes = {}

  render() {
    return (
      <div>
        {this.state.commentList.map(c => <Comment key={c.id}
                                                  id = {c.id}
                                                  message={c.message} />)}
      </div>
    )
  }
}

export default CommentList
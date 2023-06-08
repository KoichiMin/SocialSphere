import styled from "styled-components"

const SingleComment = ({user, comment}) =>{
    return (
        <CommentBox>
            <div className="user-comment">
                <div className="user">{user}</div>
                <div>{comment}</div>
            </div>
        </CommentBox>
    )
}

const CommentBox = styled.div`
    display: flex;
    flex-direction: column;
    /* opacity: 0.5; */
    background-color:#e0e0e0;
    border-radius: 10px;
    margin: 5px;

    .user-comment{
        padding: 5px;
        
    }

    .user{
        font-weight: bold;
    }
`

export default SingleComment
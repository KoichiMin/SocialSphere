import styled from "styled-components"
import LikeCommentShare from "./LikeCommentShare";
import { useEffect, useState } from "react";

const SingleMessage = ({post}) =>{
    const [updatePost, setUpdatePost] = useState(post)
    useEffect(() =>{
        setUpdatePost(post)
    }, [post])
    return(
        <ContentBox>
            <div>
                {updatePost.nickname}
            </div>
            <div>
                {updatePost.data} 
            </div>
            {updatePost.image !== "no image available" &&
                <Picture src={updatePost.image} alt="posted message"/>
            }
            
            <Numbers>
                <div>{updatePost.numLikes} likes</div>
                <div className="comment-share">
                <div>{updatePost.Comments.length} comments</div>
                <div>{updatePost.Shared.length} shares</div>
                </div>
            </Numbers>
            <Underline></Underline>
            <LikeCommentShare postId={updatePost._id}/>
        </ContentBox>
    )
}


const ContentBox = styled.div`
    background-color: white;
    width: 650px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    margin-top: 20px;
`

const Numbers = styled.div`
    display: flex;
    justify-content: space-between;
    width: 570px;
    color: grey;
    opacity: 0.5;

    .comment-share{
        display: flex;
        gap: 10px;
    }
`

const Underline = styled.div`
    width: 620px;
    height: 2px;
    background-color: black;
    opacity: 0.1;
`



const Picture = styled.img`
height: 500px;
width: 642px;

`

export default SingleMessage